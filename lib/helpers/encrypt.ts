import { SignJWT } from 'jose'

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
const JWT_TIMEOUT = process.env.JWT_TIMEOUT

export const encrypt = async (params: Object) => {
  return await new SignJWT({ ...params })
    .setExpirationTime(JWT_TIMEOUT || '1h')
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(JWT_SECRET_KEY)
}
