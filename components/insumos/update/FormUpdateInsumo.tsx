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

import { updateInsumo } from '@/lib/actions/insumos'
import { insumo } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  cantidad: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  description: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
})

interface FormUpdateInsumoProps {
  closeAlert: () => void
  id: string
  insumo: insumo
}

const FormUpdateInsumo: React.FC<FormUpdateInsumoProps> = ({
  closeAlert,
  id,
  insumo,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: insumo.nombre,
      description: insumo.description,
      cantidad: String(insumo.cantidad),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateInsumo(id, { ...values, cantidad: Number(values.cantidad) }).then(
      res =>
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
          name="cantidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
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

export default FormUpdateInsumo
