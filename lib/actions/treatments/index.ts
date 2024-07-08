'use server'

import prisma from '@/lib/prisma'

export const fetchTreatments = async () => {
  try {
    const all = await prisma.tratamiento.findMany()
    return { success: true, tratamientos: all }
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
