'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const fetchDiagnosis = async () => {
  try {
    const all = await prisma.diagnostico.findMany()
    return { success: true, diagnoses: all }
  } catch (error) {
    return { success: false }
  }
}
export const fetchOneDiagnosis = async (id: string) => {
  try {
    const one = await prisma.diagnostico.findUnique({
      where: {
        id,
      },
    })
    return { success: true, diagnosis: one }
  } catch (error) {
    return { success: false }
  }
}

interface CreateDiagnosisProps {
  nombre: string
  descripcion: string
  tratamientoId: string
}

export const createDiagnosis = async (params: CreateDiagnosisProps) => {
  try {
    await prisma.diagnostico.create({
      data: {
        nombre: params.nombre,
        descripcion: params.descripcion,
        detalleDiagnosticoTratamiento: {
          create: {
            tratamientoId: params.tratamientoId,
          },
        },
      },
    })
    revalidatePath('/dashboard/diagnosis')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
export const deleteDiagnosis = async (id: string) => {
  try {
    await prisma.diagnostico.delete({
      where: { id },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
export const updateDiagnosis = async () => {}
