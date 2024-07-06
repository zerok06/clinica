'use server'
import { encrypt } from '@/lib/helpers/encrypt'
import { getSession } from '@/lib/helpers/getSession'
import { SignJWT, jwtVerify } from 'jose'

import { cookies } from 'next/headers'
const key = new TextEncoder().encode(process.env.SECRET_KEY)
export const authentication = async (formData: FormData) => {
  try {
    const { username, password } = Object.fromEntries(formData.entries())
    if (username && password) {
      const token = await encrypt({ username, password })
      cookies().set('auth-cli', token)
      const vari = await getSession()
      return { success: true, vari }
    }
    return { success: false }
  } catch (error) {
    return { success: false, error }
  }
}
export const signIn = async () => {}
