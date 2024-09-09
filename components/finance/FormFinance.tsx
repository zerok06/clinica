'use client'

import { useState, useMemo } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { addDays, format, isWithinInterval, subDays } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { cita, pagos } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ExcelExport from '../ExcelExport'
import ButtonOption from '../ButtonDelete'
import { DeletePagos } from '@/lib/actions/pagos'
import { toast } from '../ui/use-toast'

interface FormFinanceProps {
  pagos: pagos[]
}

const FormFinance: React.FC<FormFinanceProps> = ({ pagos = [] }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const filteredData = useMemo(() => {
    let data = pagos
    if (date?.from && date?.to) {
      data = data.filter(item =>
        isWithinInterval(item.createAt, {
          /* @ts-ignore */
          start: new Date(date.from),
          /* @ts-ignore */
          end: new Date(date.to),
        })
      )
    }
    return data
  }, [date])

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-background p-6 rounded-xl">
        <div className="flex flex-col">
          <Label>Intervalo de fechas</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-[300px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="bg-background p-6 rounded-xl">
        <div className="flex justify-between items-center">
          <div></div>
          <div>
            <ExcelExport data={pagos} fileName="pagos" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asunto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Paciente</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead className="text-right">Opciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {format(item.fecha, "d 'de' MMMM 'del' yyyy", {
                    locale: es,
                  })}
                </TableCell>
                <TableCell>{item.desc}</TableCell>
                <TableCell>
                  <div className="flex">
                    {item?.procedimientoId && (
                      /* @ts-ignore */
                      <div className="py-1 pl-1 pr-3 rounded-full flex gap-2 bg-black/20">
                        <Avatar className="h-7 w-7 text-xs">
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {/* @ts-ignore */}
                            {item?.procedimiento.paciente.nombres[0]
                              /* @ts-ignore */
                              .concat(item?.procedimiento.paciente.apellidos[0])
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-[12px] font-medium leading-none">
                            {/* @ts-ignore */}
                            {item?.procedimiento.paciente.nombres}
                          </p>
                          <p className="text-[10px] text-black/70 leading-tight">
                            {/* @ts-ignore */}
                            {item?.procedimiento.paciente.dni}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  PEN <span className="font-medium">{item.monto}</span>
                </TableCell>
                <TableCell className="text-right">
                  <ButtonOption
                    label={'delete'}
                    deleteDB={() =>
                      DeletePagos(item.id).then(res =>
                        toast({
                          title: 'Uh oh! Something went wrong.',
                          description: JSON.stringify(res),
                        })
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default FormFinance
