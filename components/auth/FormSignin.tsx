'use client'
import React from 'react'
import Prueba from '@/components/Prueba'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authentication } from '@/lib/actions/auth/signin'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
  password: z.string().min(2, {
    message: 'Se requiere como mínimo 2 caracteres',
  }),
})

const FormSignin = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    authentication(values).then(res => {
      if (res.success) {
        toast({
          title: 'Inicio de sesión exitoso',
          description:
            'Bienvenido de nuevo, ¡has iniciado sesión correctamente!',
        })
        router.push('/dashboard')
      } else {
        toast({
          title: 'Error en el inicio de sesión',
          description:
            'Usuario o contraseña incorrectos. Inténtalo nuevamente.',
        })
      }
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </Form>
  )
}

export default FormSignin
