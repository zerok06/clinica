const { PrismaClient } = require('@prisma/client')
const temporal_prisma = new PrismaClient()
const bcrypt = require('bcrypt')

const DEFAULT_USUARIO = {
  username: 'zerok06',
  apellidos: 'Paye Mamani',
  dni: '73736059',
  nombres: 'Jose Enrique',
  telefono: '910852459',
  email: 'jose.geeksjose@gmail.com',
  password: 'josepaye123',
  role: 'administrador',
}

const load = async () => {
  try {
    const root = await temporal_prisma.usuario.findFirst({
      where: { email: DEFAULT_USUARIO.email },
    })
    if (!root) {
      await temporal_prisma.usuario.deleteMany()
      await temporal_prisma.credenciales.deleteMany()
      const {
        password,
        username,
        apellidos,
        dni,
        email,
        nombres,
        role,
        telefono,
      } = DEFAULT_USUARIO
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      const newCredenciales = await temporal_prisma.credenciales.create({
        data: {
          username,
          password: hash,
        },
      })
      await temporal_prisma.usuario.create({
        data: {
          apellidos,
          dni,
          email,
          nombres,
          role,
          telefono,
          credencialesId: newCredenciales.id,
        },
      })
    }
    const users = await temporal_prisma.usuario.findMany()
    console.log('✅ Semilla desplegada!')
    console.table(users)
  } catch (error) {
    console.log('🚫 Semilla no desplegada!')
    console.log(error)
    await temporal_prisma.$disconnect()
  }
}
load()
