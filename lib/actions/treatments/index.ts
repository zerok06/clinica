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
  categoryId?: string
  categoryName?: string
  categoryDesc?: string
}

export const createTreatment = async ({
  categoryId,
  descripcion,
  nombre,
  categoryDesc,
  categoryName,
}: CreateTreatmentProps) => {
  try {
    if (!categoryId && categoryDesc && categoryName) {
      categoryId = (
        await prisma.categoriaTratamiento.create({
          data: {
            nombre: categoryName,
            descripcion: categoryDesc,
          },
        })
      ).id
    }

    await prisma.tratamiento.create({
      data: {
        nombre,
        descripcion,
        categoriaTratamientoId: categoryId!,
      },
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
