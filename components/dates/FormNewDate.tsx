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
import { Textarea } from '../ui/textarea'
import { createDates } from '@/lib/actions/dates'
import type { paciente } from '@prisma/client'
import { DateTimePicker } from '../ui/datetime-picker'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  description: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  pacienteId: z.string({
    required_error: 'Seleccione un paciente.',
  }),
  start: z.date({ required_error: 'A date of birth is required.' }),
  end: z.date({ required_error: 'A date of birth is required.' }),
})

interface FormNewDateProps {
  closeAlert: () => void
  pacientes: paciente[]
}

const FormNewDate: React.FC<FormNewDateProps> = ({ closeAlert, pacientes }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      pacienteId: '',
      start: new Date(),
      end: new Date(),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    createDates(values).then(res =>
      toast({
        title: 'Uh oh! Something went wrong.',
        description: JSON.stringify(res),
      })
    )
    /* closeAlert() */
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <h2 className="text-lg font-semibold">Cita</h2>
        <FormField
          control={form.control}
          name="title"
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
        <FormField
          control={form.control}
          name="pacienteId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pacientes</FormLabel>
              <Select
                onValueChange={field.onChange}
                disabled={pacientes.length === 0}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria de tratamiento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pacientes.map(item => (
                    <SelectItem value={item.id}>{item.nombres}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full">
              <FormLabel htmlFor="datetime">Date time</FormLabel>
              <FormControl>
                <DateTimePicker
                  granularity="minute"
                  hourCycle={12}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full">
              <FormLabel htmlFor="datetime">Date time</FormLabel>
              <FormControl>
                <DateTimePicker
                  granularity="minute"
                  hourCycle={12}
                  value={field.value}
                  onChange={field.onChange}
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

export default FormNewDate
