'use server'
import prisma from '@/lib/prisma'
import { EstadoCita } from '@/lib/types'
import { cita } from '@prisma/client'
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
      include: {
        paciente: true,
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
      include: {
        paciente: true,
      },
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

export type CreateDateProps = Omit<
  cita,
  'createAt' | 'updateAt' | 'id' | 'procedimientoId' | 'estado'
>

export const createDates = async (params: CreateDateProps) => {
  try {
    const startDate = new Date(params.start)
    const endDate = new Date(params.end)

    const citaSolapada = await prisma.cita.findFirst({
      where: {
        AND: [{ start: { lt: endDate } }, { end: { gt: startDate } }],
      },
    })

    if (citaSolapada) {
      return {
        success: false,
        error: 'Ya existe una cita en este intervalo de tiempo.',
      }
    }

    await prisma.cita.create({
      data: params,
    })
    revalidatePath('/dashboard/patient/[id]/dates')
    revalidatePath('/dashboard/patient/[id]/procedimiento/[idProcedimiento]')
    revalidatePath('/dashboard/dates')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export type CreateDateProcedimientoProps = Omit<
  cita,
  'createAt' | 'updateAt' | 'id' | 'estado'
>
export const createDatesProcedimiento = async (
  params: CreateDateProcedimientoProps
) => {
  try {
    const { description, end, procedimientoId, start, title, doctorId } = params

    await prisma.cita.create({
      data: { description, end, procedimientoId, start, title, doctorId },
    })
    revalidatePath('/dashboard/patient/[id]/dates')
    revalidatePath('/dashboard/patient/[id]/procedimiento/[idProcedimiento]')
    revalidatePath('/dashboard/dates')
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
    revalidatePath('/dashboard/patient/[id]/procedimiento/[idProcedimiento]')
    revalidatePath('/dashboard/dates')
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
