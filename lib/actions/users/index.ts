'use server'
import encryptPassword from '@/lib/helpers/encryptPassword'
import prisma from '@/lib/prisma'
import { Role } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export type response = {
  success: boolean
}

const fetchUsers = async () => {
  try {
    const all = await prisma.usuario.findMany()
    return { success: true, users: all }
  } catch (error) {
    return { success: false }
  }
}

export type CreateUser = {
  username: string
  password: string
  nombres: string
  apellidos: string
  email: string
  dni: string
  telefono: string
  role: Role
}

const createNewUser = async (user: CreateUser) => {
  try {
    const {
      username,
      apellidos,
      dni,
      email,
      nombres,
      password,
      telefono,
      role,
    } = user
    const existCredentials = await prisma.credenciales.findFirst({
      where: {
        username,
      },
    })

    if (existCredentials) {
      return { success: false, message: 'Credenciales existentes' }
    }
    await prisma.usuario.create({
      data: {
        apellidos: user.apellidos,
        nombres: user.nombres,
        dni: user.dni,
        email: user.email,
        telefono: user.telefono,
        role: user.role,
        credenciales: {
          create: {
            username,
            password: encryptPassword(password),
          },
        },
      },
    })
    revalidatePath('/dashboard/users')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

const deleteUser = async (id: string) => {
  try {
    await prisma.usuario.delete({
      where: {
        id,
      },
    })
    revalidatePath('/dashboard/users')
    return {
      success: true,
    }
  } catch (error) {
    return { success: false }
  }
}

export { fetchUsers, createNewUser, deleteUser }
