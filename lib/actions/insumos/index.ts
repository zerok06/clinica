'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const fetchInsumo = async () => {
  try {
    const all = await prisma.insumo.findMany()
    return { success: true, insumos: all }
  } catch (error) {
    return { success: false }
  }
}
export const fetchOneInsumo = async (id: string) => {
  try {
    const one = await prisma.insumo.findUnique({
      where: { id },
    })
    return { success: true, insumos: one }
  } catch (error) {
    return { success: false }
  }
}

interface CreateInsumoProps {
  nombre: string
  cantidad: number
  description: string
}

export const createInsumo = async (params: CreateInsumoProps) => {
  try {
    await prisma.insumo.create({
      data: params,
    })
    revalidatePath('/dashboard/insumos')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
export const deleteInsumo = async (id: string) => {
  try {
    await prisma.insumo.delete({
      where: {
        id,
      },
    })
    revalidatePath('/dashboard/insumos')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
