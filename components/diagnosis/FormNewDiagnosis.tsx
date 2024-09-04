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
import { toast } from '../ui/use-toast'
import { createTreatment } from '@/lib/actions/treatments'
import type { tratamiento } from '@prisma/client'
import Link from 'next/link'
import { Textarea } from '../ui/textarea'
import { createDiagnosis } from '@/lib/actions/diagnosis'

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  descripcion: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  tratamientoId: z.string({
    required_error: 'Seleccione un tratamiento.',
  }),
})

interface FormNewDiagnosisProps {
  closeAlert: () => void
  treatments: Array<tratamiento>
}

const FormNewDiagnosis: React.FC<FormNewDiagnosisProps> = ({
  closeAlert,
  treatments,
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      tratamientoId: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    createDiagnosis(values).then(res =>
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
        <h2 className="text-lg font-semibold">Diagnostico</h2>
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="0000000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingrese una descripción sobre el diagnostico."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tratamientoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tratamiento relacionado</FormLabel>
              <Select
                onValueChange={field.onChange}
                disabled={treatments.length === 0}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {treatments.map(item => (
                    <SelectItem value={item.id}>{item.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default FormNewDiagnosis
