import { sign } from 'jsonwebtoken'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const JWT_TIMEOUT = process.env.JWT_TIMEOUT

export const encrypt = (params: Object) => {
  if (!JWT_SECRET_KEY) {
    return new Error('Error .env, no le puede leer JWT_SECRET_KEY')
  }

  return sign(params, JWT_SECRET_KEY, { expiresIn: JWT_TIMEOUT })
}
