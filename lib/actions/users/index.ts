'use server'
import encryptPassword from '@/lib/helpers/encryptPassword'
import prisma from '@/lib/prisma'
import { Role } from '@/lib/types'
import { usuario } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export type response = {
  success: boolean
}

const fetchUsers = async () => {
  try {
    const all = await prisma.usuario.findMany({
      include: {
        credenciales: true,
      },
    })
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

interface UpdateUserParams
  extends Omit<usuario, 'id' | 'createAt' | 'updateAt' | 'credencialesId'> {
  username: string
  password: string
}

export const updateUser = async (id: string, params: UpdateUserParams) => {
  try {
    await prisma.usuario.update({
      where: { id },
      data: {
        nombres: params.nombres,
        apellidos: params.apellidos,
        dni: params.dni,
        email: params.email,
        role: params.role,
        telefono: params.telefono,
        credenciales: {
          update: {
            password: params.password,
            username: params.username,
          },
        },
      },
    })

    /* await prisma.credenciales.update({
      where: { id: params.credencialesId },
      data: { password: params.password, username: params.username },
    })
    await prisma.usuario.update({
      id:
    }) */

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
