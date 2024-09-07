'use server'
import { encrypt } from '@/lib/helpers/encrypt'
import { getSession } from '@/lib/helpers/getSession'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface authenticationProps {
  username: string
  password: string
}

export const authentication = async (params: authenticationProps) => {
  try {
    const { username, password } = params

    if (!username && !password) {
      return { success: false, error: 'Credenciales faltantes' }
    }
    const existUser = await prisma.usuario.findFirst({
      where: {
        credenciales: {
          username,
        },
      },
      include: {
        credenciales: true,
      },
    })
    if (!existUser) {
      return { success: false, error: 'Usuario no Existe' }
    }

    const token = encrypt({
      user: existUser,
    })
    if (!token) {
      return { success: false, error: 'Error al generar token' }
    }
    /* @ts-ignore */
    cookies().set('auth-cli', token)
    const session = await getSession()
    return { success: true, session }
  } catch (error) {
    return { success: false, error }
  }
}
export const logout = async () => {
  try {
    cookies().delete('auth-cli')
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
