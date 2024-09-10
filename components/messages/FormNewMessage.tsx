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
import { createNewUser } from '@/lib/actions/users'
import { toast } from '../ui/use-toast'
import { createTemplateMessage } from '@/lib/actions/message'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  asunto: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  mensaje: z.string().min(6, {
    message: 'Se requiere como mínimo 6 caracteres',
  }),
})

interface FormNewMessageProps {
  closeAlert: () => void
}

const FormNewMessage: React.FC<FormNewMessageProps> = ({ closeAlert }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asunto: '',
      mensaje: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    createTemplateMessage(values).then(res =>
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
        <h2 className="text-lg font-semibold">Credenciales</h2>
        <FormField
          control={form.control}
          name="asunto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asunto</FormLabel>
              <FormControl>
                <Input placeholder="asunto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mensaje"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingrese la plantilla de mensaje."
                  className="resize-none"
                  {...field}
                  rows={12}
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

export default FormNewMessage
