'use server'
import encryptPassword from '@/lib/helpers/encryptPassword'
import prisma from '@/lib/prisma'
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
  role: 'admin' | 'management' | 'doctor'
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
      return new Error('Credenciales existentes')
    }
    const newCredenciales = await prisma.credenciales.create({
      data: {
        username,
        password: encryptPassword(password),
      },
    })

    const newUser = await prisma.usuario.create({
      data: {
        apellidos,
        dni,
        email,
        nombres,
        telefono,
        credencialesId: newCredenciales.id,
      },
    })

    switch (role) {
      case 'admin':
        await prisma.administrador.create({
          data: {
            usuarioId: newUser.id,
          },
        })
        break

      case 'management':
        await prisma.secretaria.create({
          data: {
            usuarioId: newUser.id,
          },
        })
        break

      case 'doctor':
        await prisma.doctor.create({
          data: {
            usuarioId: newUser.id,
          },
        })
        break
    }
    revalidatePath('/dashboard/users')
    return { success: true }
  } catch (error) {
    return { success: false, error }
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
