import React from 'react'
import type { Diente, MonoProps } from '@/hook/useOdontograma'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import AddDiagnosis from './AddDiagnosis'
import type { tratamiento } from '@prisma/client'

interface ToothProps extends Diente {
  tratamientos: tratamiento[]
  addDiagnosticoMono: (props: MonoProps, code: number) => void
}

const Tooth: React.FC<ToothProps> = diente => {
  const {
    code,
    diagnostico,
    id,
    image,
    name,
    tratamientos,
    addDiagnosticoMono,
  } = diente
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="w-[40px] flex items-center flex-col relative"
          title={code.toString()}
          key={id}
        >
          <p className="text-xs text-primary/60">{code}</p>
          <img src={image} className="w-[40px] h-[61px]" />
          <div className="absolute h-full w-full">
            {diagnostico.map(item => (
              <img
                key={item.nomenclatura}
                src={item.base64}
                className="absolute bottom-0 left-0 h-[61px] w-[40px]"
              />
            ))}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Diente #{code}</DialogTitle>
          <DialogDescription>
            <div className="flex gap-4 flex-row items-start">
              <div className="flex-1">
                <Table className="text-sm">
                  <TableCaption>
                    <AddDiagnosis
                      {...diente}
                      tratamientos={tratamientos}
                      addDiagnosticoMono={addDiagnosticoMono}
                    />
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Id</TableHead>
                      <TableHead>Diagnostico</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {diagnostico.map((item, index) => (
                      <TableRow key={item.name + index}>
                        <TableCell className="font-medium p-2">
                          {index}
                        </TableCell>
                        <TableCell className=" p-2">{item.name}</TableCell>
                        <TableCell className=" p-2">Credit Card</TableCell>
                        <TableCell className="text-right  p-2">
                          $250.00
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="w-[182px] p-4 rounded-lg bg-primary/5 relative">
                <img src={image} className="w-[150px] h-[228.75px]" />
                {diagnostico.map(item => (
                  <img
                    key={item.nomenclatura}
                    src={item.base64}
                    className="absolute top-[16px] left-[16px] w-[150px] h-[228.75px]"
                  />
                ))}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Tooth
