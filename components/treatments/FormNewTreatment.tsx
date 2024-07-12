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
import type { categoriaTratamiento } from '@prisma/client'
import Link from 'next/link'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  descripcion: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  categoriaTratamientoId: z.string({
    required_error: 'Seleccione una categoría.',
  }),
})

interface FormNewTreatmentProps {
  closeAlert: () => void
  categories: Array<categoriaTratamiento>
}

const FormNewTreatment: React.FC<FormNewTreatmentProps> = ({
  closeAlert,
  categories,
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      categoriaTratamientoId: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    createTreatment(values).then(res =>
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
                  placeholder="Ingrese una descripción sobre el tratamiento."
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
          name="categoriaTratamientoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select
                onValueChange={field.onChange}
                disabled={categories.length === 0}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(item => (
                    <SelectItem value={item.id}>{item.nombre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription className="text-red-500">
                Al parecer no existe ninguna categoria{' '}
                <Link href={'#'} className="text-blue-400 hover:underline">
                  Agregar
                </Link>
              </FormDescription>
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

export default FormNewTreatment
