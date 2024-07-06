import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

export const getSession = async () => {
  const token = cookies().get('auth-cli')?.value
  const { payload, protectedHeader } = await jwtVerify(token, JWT_SECRET_KEY)
  return jwtVerify(token, JWT_SECRET_KEY)
}
