'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { pagos } from '@prisma/client'
import { updatePago } from '@/lib/actions/pagos'
import { toast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  title: z.string(),
  monto: z.string(),
  desc: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
})

interface FormUpdatePagoProps {
  closeAlert: () => void
  id: string
  pago: pagos
}

const FormUpdatePago: React.FC<FormUpdatePagoProps> = ({
  closeAlert,
  id,
  pago,
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: pago.title,
      monto: String(pago.monto),
      desc: pago.desc,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    updatePago(id, { ...values, monto: Number(values.monto) }).then(res =>
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Titulo de pago" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Monto de pago" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
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

export default FormUpdatePago
