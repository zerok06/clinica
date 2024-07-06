'use server'
import { encrypt } from '@/lib/helpers/encrypt'
import { getSession } from '@/lib/helpers/getSession'

import { cookies } from 'next/headers'
export const authentication = async (formData: FormData) => {
  try {
    const { username, password } = Object.fromEntries(formData.entries())
    if (username && password) {
      const token = encrypt({ username, password })
      if (typeof token != 'string') {
        return new Error('No se puedo generar token')
      }
      cookies().set('auth-cli', token)
      const session = await getSession()
      return { success: true, session }
    }
    return { success: false }
  } catch (error) {
    return { success: false, error }
  }
}
export const signIn = async () => {}
