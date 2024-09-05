import React, { InputHTMLAttributes, useRef, useState } from 'react'
import type { Diente, MonoProps } from '../../hook/useOdontograma'
import useOpen from '../../hook/useOpen'
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { Label } from '../ui/label'
import { Eraser, Pen, Trash } from 'lucide-react'
import { tratamiento } from '@prisma/client'
import { ComboBox } from '../ComboBox'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import useText from '@/hook/useText'
const sistema_code = [
  {
    numero: 18,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 17,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 16,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 15,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/2.svg',
  },
  {
    numero: 14,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/4.svg',
  },
  {
    numero: 13,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 12,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 11,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 21,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 22,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 23,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 24,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/3.svg',
  },
  {
    numero: 25,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/2.svg',
  },
  {
    numero: 26,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 27,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 28,
    area: 'permanente-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 55,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 54,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 53,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 52,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 51,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 61,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 66,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 63,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/5.svg',
  },
  {
    numero: 64,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 65,
    area: 'temporal-superior',
    image: '/assets/images/odontogram/dientes/1.svg',
  },
  {
    numero: 85,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R1.svg',
  },
  {
    numero: 84,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R8.svg',
  },
  {
    numero: 83,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 82,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 81,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 71,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 77,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 73,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 74,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R8.svg',
  },
  {
    numero: 75,
    area: 'temporal-inferior',
    image: '/assets/images/odontogram/dientes/R2.svg',
  },
  {
    numero: 48,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R8.svg',
  },
  {
    numero: 47,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R8.svg',
  },
  {
    numero: 46,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R1.svg',
  },
  {
    numero: 45,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R7.svg',
  },
  {
    numero: 44,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R7.svg',
  },
  {
    numero: 43,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 42,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 41,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 31,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 33,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 33,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R3.svg',
  },
  {
    numero: 34,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R7.svg',
  },
  {
    numero: 35,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R7.svg',
  },
  {
    numero: 36,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R2.svg',
  },
  {
    numero: 37,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R8.svg',
  },
  {
    numero: 38,
    area: 'permanente-inferior',
    image: '/assets/images/odontogram/dientes/R8.svg',
  },
]

interface AddDiagnosisProps extends Diente {
  tratamientos: tratamiento[]
  addDiagnosticoMono: (props: MonoProps, code: number) => void
}

const AddDiagnosis: React.FC<AddDiagnosisProps> = ({
  code,
  diagnostico,
  id,
  image,
  name,
  tratamientos,
  addDiagnosticoMono,
}) => {
  const { open, handleOpen } = useOpen()
  const [props, setProps] = useState({
    name: '',
    nomenclatura: '',
    desc: '',
    canvas: '',
    base64: '',
  })

  const handleTreatment = (value: string) => {
    setProps(state => ({ ...state, name: value }))
  }
  /* @ts-ignore */
  const handleProps = ({ target: { value, name } }) => {
    setProps(state => ({ ...state, [name]: value }))
  }

  /*   const { handleNumber, number } = useNumber() */
  const canvasRef = useRef<ReactSketchCanvasRef>(null)
  const { handleText, text } = useText('#f00')

  const resetCanvas = () => canvasRef.current?.resetCanvas()
  const changeMode = (state: boolean) => canvasRef.current?.eraseMode(state)

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger>
        <button>Nuevo diagnostico</button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Diente #{code}</DialogTitle>
          <DialogDescription>
            <div className="flex gap-4 flex-row items-start">
              <div className="flex-1">
                <div>
                  <Label>Diagnostico</Label>
                  <ComboBox
                    items={tratamientos.map(item => ({
                      label: item.nombre,
                      value: item.id,
                    }))}
                    setValue={handleTreatment}
                    value={props.name}
                    placeholder={'Seleciona un diagnostico...'}
                  />
                </div>
                <div>
                  <Label>Descripcion</Label>
                  <Textarea
                    placeholder="Ingrese una descripcion corta..."
                    defaultValue={props.desc}
                    onChange={handleProps}
                  />
                </div>
              </div>

              <div className="w-[160px] p-4 rounded-lg bg-primary/5 flex flex-col items-center gap-2 ">
                <div className="gap-3 items-center">
                  <div className="col-span-3 flex flex-row items-center justify-center rounded-md">
                    <div className=" w-[120px] h-[180px]">
                      <ReactSketchCanvas
                        width="200"
                        height="100%"
                        strokeColor={text}
                        ref={canvasRef}
                        canvasColor="transparent"
                        preserveBackgroundImageAspectRatio="xMidYMid meet"
                        backgroundImage={
                          sistema_code.find(item => item.numero === code)?.image
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex  gap-1 justify-end">
                  <button
                    className="border rounded-md h-6 flex justify-center items-center w-6 bg-primary"
                    onClick={() => changeMode(false)}
                  >
                    <Pen size={10} color="#fff" />
                  </button>
                  <input
                    type="color"
                    className="border rounded-md h-6 justify-center items-center w-5  outline-none"
                    /* @ts-ignore */
                    onChange={({ target: { value } }) => handleText(value)}
                    value={text}
                  />
                  <button
                    className="border rounded-md h-6 flex justify-center items-center w-6 bg-primary"
                    onClick={() => changeMode(true)}
                  >
                    <Eraser size={10} color="#fff" />
                  </button>
                  <button
                    className="border rounded-md h-6 flex justify-center items-center w-6 bg-primary"
                    onClick={resetCanvas}
                  >
                    <Trash size={10} color="#fff" />
                  </button>
                </div>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button
              type="submit"
              onClick={async () => {
                const currentBase64 = await canvasRef.current?.exportImage(
                  'png'
                )!
                addDiagnosticoMono({ ...props, base64: currentBase64 }, code)
              }}
            >
              Agregar
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddDiagnosis
