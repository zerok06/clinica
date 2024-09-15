'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createTreatment } from '@/lib/actions/treatments'
import Link from 'next/link'
import { createInsumo } from '@/lib/actions/insumos'
import { createDoctors, updateDoctor } from '@/lib/actions/doctors'
import { toast } from '@/components/ui/use-toast'
import { doctor } from '@prisma/client'

const formSchema = z.object({
  nombres: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  apellidos: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  code: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  dni: z.string().length(8, { message: 'Se requiere como maximo 8 digitos' }),
  email: z.string().email({
    message: 'Se require un formato tipo correo.',
  }),
})

interface FormUpdateDoctorProps {
  closeAlert: () => void
  id: string
  doctor: doctor
}

const FormUpdateDoctor: React.FC<FormUpdateDoctorProps> = ({
  id,
  doctor,
  closeAlert,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: doctor.nombres,
      apellidos: doctor.apellidos,
      code: doctor.code,
      dni: doctor.dni,
      email: doctor.email,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateDoctor(id, { ...values }).then(res =>
      toast({
        title: 'Uh oh! Something went wrong.',
        description: JSON.stringify(res),
      })
    )
    closeAlert()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <h2 className="text-lg font-semibold">Tratamiento</h2>
        <FormField
          control={form.control}
          name="nombres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apellidos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellidos</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dni</FormLabel>
              <FormControl>
                <Input placeholder="Dni" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo</FormLabel>
              <FormControl>
                <Input placeholder="Codigo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input placeholder="Dni" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-2">
          <Button variant={'ghost'} type="button" onClick={closeAlert}>
            Cancelar
          </Button>
          <Button type="submit">Registrar</Button>
        </div>
      </form>
    </Form>
  )
}

export default FormUpdateDoctor
