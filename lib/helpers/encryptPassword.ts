import bcrypt from 'bcrypt'

const encryptPassword = (password: string): string => {
  const saltRounds = 10
  const hash = bcrypt.hashSync(password, saltRounds)
  return hash
}

export default encryptPassword
