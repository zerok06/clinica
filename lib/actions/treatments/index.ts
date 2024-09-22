'use server'

import prisma from '@/lib/prisma'
import { categoriaTratamiento, tratamiento } from '@prisma/client'
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

export const fetchTratamientoPacienteOrdontograma = async (id: string) => {
  try {
    const odontograma = await prisma.odontograma.findFirst({
      where: { pacienteId: id },
    })

    const diagnosticos = await prisma.diagnosticoMonoDiente.findMany({
      where: {
        diente: {
          odontogramaId: odontograma?.id,
        },
      },
      include: {
        dignostico: {
          select: {
            detalleDiagnosticoTratamiento: {
              include: {
                tratamiento: true,
              },
              distinct: 'diagnosticoId',
            },
          },
        },
      },
      distinct: 'diagnosticoId',
    })

    const tratamientosRecomendados = diagnosticos
      .map(item => ({ ...item.dignostico.detalleDiagnosticoTratamiento }))
      .map(obj => {
        const key = Object.keys(obj)[0]
        /* @ts-ignore */
        const tratamiento = obj[key].tratamiento

        return tratamiento
      })

    return {
      success: true,
      tratamientos: tratamientosRecomendados,
    }
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
export const deleteCategoryTreatment = async (id: string) => {
  try {
    await prisma.categoriaTratamiento.delete({
      where: {
        id,
      },
    })
    revalidatePath('/dashboard/treatments')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

type UpdateCategoryTreatmentProps = Omit<
  categoriaTratamiento,
  'createAt' | 'updateAt' | 'id'
>

export const updateCategoryTreatment = async (
  id: string,
  props: UpdateCategoryTreatmentProps
) => {
  try {
    await prisma.categoriaTratamiento.update({
      where: {
        id,
      },
      data: props,
    })
    revalidatePath('/dashboard/treatments')
    return {
      success: true,
      msg: {
        title: 'Actualizacion correcta!',
        desc: '',
      },
    }
  } catch (error) {
    return {
      success: false,
      msg: {
        title: 'Error en actualizacion',
        desc: '',
      },
    }
  }
}

interface CreateTreatmentProps {
  nombre: string
  descripcion: string
  monto: string
  categoriaTratamientoId: string
}

export const createTreatment = async (params: CreateTreatmentProps) => {
  try {
    await prisma.tratamiento.create({
      data: { ...params, monto: Number(params.monto) },
    })
    revalidatePath('/dashboard/treatments')

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

type UpdateTreatmentParams = Omit<tratamiento, 'id' | 'createAt' | 'updateAt'>

export const updateTreatment = async (
  id: string,
  params: UpdateTreatmentParams
) => {
  try {
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
