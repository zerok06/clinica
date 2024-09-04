'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const fetchTreatments = async () => {
  try {
    const all = await prisma.tratamiento.findMany({
      include: { categoriaTratamiento: true },
    })
    return { success: true, tratamientos: all }
  } catch (error) {
    return { success: false }
  }
}
interface CreateCategoryTreatmentProps {
  nombre: string
  descripcion: string
}
export const createCategoryTreatment = async (
  params: CreateCategoryTreatmentProps
) => {
  try {
    await prisma.categoriaTratamiento.create({
      data: params,
    })
    revalidatePath('/dashboard/treatments')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const categoriesTreatments = async () => {
  try {
    const all = await prisma.categoriaTratamiento.findMany()

    return { success: true, categories: all }
  } catch (error) {
    return { success: false }
  }
}

interface CreateTreatmentProps {
  nombre: string
  descripcion: string
  categoriaTratamientoId: string
}

export const createTreatment = async (params: CreateTreatmentProps) => {
  try {
    await prisma.tratamiento.create({
      data: params,
    })
    revalidatePath('/dashboard/treatments')

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const deleteTreatment = async (id: string) => {
  try {
    await prisma.tratamiento.delete({
      where: {
        id,
      },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
