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
import ButtonNewCategoryTreatment from './ButtonNewCategoryTreatment'

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
  monto: z.string().min(0, {
    message: 'Monto minimo es 1.',
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
      monto: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
                <Input placeholder="Nombre" {...field} />
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
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                disabled={categories.length === 0}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria de tratamiento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(item => (
                    <SelectItem value={item.id} key={item.id}>
                      {item.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              <FormDescription className="text-red-500">
                Al parecer no existe ninguna categoria{' '}
                <ButtonNewCategoryTreatment />
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ingrese una descripción sobre el tratamiento."
                  className="resize-none"
                  {...field}
                />
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

export default FormNewTreatment
