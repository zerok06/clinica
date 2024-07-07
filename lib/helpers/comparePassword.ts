import bcrypt from 'bcrypt'

const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export default comparePassword
