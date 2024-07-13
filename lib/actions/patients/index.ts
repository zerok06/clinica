'use server'
import prisma from '@/lib/prisma'

export const fetchPatients = async () => {
  try {
    const all = await prisma.paciente.findMany()
    return { success: true, patients: all }
  } catch (error) {
    return { success: false }
  }
}
export const fetchOnePatients = async (id: string) => {
  try {
    const one = await prisma.paciente.findUnique({
      where: {
        id,
      },
    })
    return { success: true, patient: one }
  } catch (error) {
    return { success: false }
  }
}

interface CreatePatientProps {
  nombres: string
  apellidos: string
  direccion: string
  nacimiento: Date
  edad: number
  dni: string
  celular: string
  convenio: string
}

export const createNewPatient = async (params: CreatePatientProps) => {
  try {
    await prisma.paciente.create({
      data: params,
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
export const deletePatient = async (id: string) => {
  try {
    await prisma.paciente.delete({
      where: {
        id,
      },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
