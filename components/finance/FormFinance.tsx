'use client'

import { useState, useMemo } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { format, isWithinInterval, subDays } from 'date-fns'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { pagos } from '@prisma/client'
import { DataTable } from '../data-table'
import { columns } from './columns'

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
        <DataTable
          columns={columns}
          excelName="pagos"
          filterColumn={'title'}
          data={filteredData}
        />
      </div>
    </div>
  )
}

export default FormFinance
