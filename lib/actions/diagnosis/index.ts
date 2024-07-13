'use server'
import prisma from '@/lib/prisma'

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
}

export const createDiagnosis = async (params: CreateDiagnosisProps) => {
  try {
    await prisma.diagnostico.create({
      data: params,
    })
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
