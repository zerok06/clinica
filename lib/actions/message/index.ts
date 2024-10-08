'use server'
import prisma from '@/lib/prisma'
import { TipoMensaje } from '@/lib/types'
import type { PlantillaMensaje } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const fetchTemplateMessage = async () => {
  try {
    const all = await prisma.plantillaMensaje.findMany()
    return { success: true, plantillas: all }
  } catch (error) {
    return { success: false }
  }
}

export const fetchOneTemplateMessage = async (type: TipoMensaje) => {
  try {
    const msg = await prisma.plantillaMensaje.findFirst({
      where: {
        type,
      },
    })
    return { success: true, plantilla: msg }
  } catch (error) {
    return { success: false }
  }
}

export const createTemplateMessage = async (
  params: Readonly<
    Omit<PlantillaMensaje, 'createAt' | 'updateAt' | 'id' | 'type'>
  >
) => {
  try {
    await prisma.plantillaMensaje.create({
      data: params,
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const updateTemplateMessage = async (
  id: string,
  params: Omit<PlantillaMensaje, 'createAt' | 'updateAt' | 'id' | 'type'>
) => {
  try {
    await prisma.plantillaMensaje.update({
      where: {
        id,
      },
      data: params,
    })
    revalidatePath('/dashboard/templates')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
export const deleteTemplateMessage = async (id: string) => {
  try {
    await prisma.plantillaMensaje.delete({
      where: {
        id,
      },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
