'use server'
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

export const getSession = () => {
  try {
    const token = cookies().get('auth-cli')?.value
    if (!token || !JWT_SECRET_KEY) {
      return null
    }
    const params = verify(token, JWT_SECRET_KEY)

    return params ? params : null
  } catch (error) {
    return null
  }
}
