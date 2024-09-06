'use server'
import prisma from '@/lib/prisma'
import type { EstadoCita } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const fetchDates = async () => {
  try {
    const all = await prisma.cita.findMany()
    return { success: true, dates: all }
  } catch (error) {
    return { success: false }
  }
}

export const fetchDatesPatient = async (id: string) => {
  try {
    const all = await prisma.cita.findMany({
      where: {
        procedimiento: {
          pacienteId: id,
        },
      },
    })
    return { success: true, dates: all }
  } catch (error) {
    return { success: false }
  }
}

export const fetchDatesProcedimientos = async (id: string) => {
  try {
    const all = await prisma.cita.findMany({
      where: { procedimientoId: id },
    })
    return { success: true, dates: all }
  } catch (error) {
    return { success: false }
  }
}

export const fetchOneDate = async (id: string) => {
  try {
    const one = await prisma.cita.findUnique({
      where: {
        id,
      },
    })
    return { success: true, diagnosis: one }
  } catch (error) {
    return { success: false }
  }
}

export interface CreateDateProps {
  title: string
  description: string
  start: Date
  end: Date
  pacienteId?: string
}

export const createDates = async (params: CreateDateProps) => {
  console.log(params)

  try {
    await prisma.cita.create({
      data: params,
    })
    revalidatePath('/dashboard/diagnosis')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export interface CreateDateProcedimientoProps {
  title: string
  description: string
  start: Date
  end: Date
  procedimientoId: string
}

export const createDatesProcedimiento = async (
  params: CreateDateProcedimientoProps
) => {
  try {
    const { description, end, procedimientoId, start, title } = params
    console.log({ description, end, procedimientoId, start, title })

    await prisma.cita.create({
      data: { description, end, procedimientoId, start, title },
    })
    revalidatePath('/dashboard/diagnosis')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const changeStatus = async (id: string, status: EstadoCita) => {
  try {
    await prisma.cita.update({
      where: { id },
      data: {
        estado: status,
      },
    })
    revalidatePath('/dashboard/patient/[id]/dates')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const deleteDate = async (id: string) => {
  try {
    await prisma.cita.delete({
      where: { id },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
