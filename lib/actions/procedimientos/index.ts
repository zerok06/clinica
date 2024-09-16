'use server'
import prisma from '@/lib/prisma'
import { StatusProcedimiento } from '@/lib/types'
import { revalidatePath } from 'next/cache'

export const fetchProcedimiento = async () => {
  try {
    const all = await prisma.procedimiento.findMany()
    return { success: true, procedimientos: all }
  } catch (error) {
    return { success: false }
  }
}
export const fetchOneProcedimiento = async (id: string) => {
  try {
    const all = await prisma.procedimiento.findUnique({
      where: {
        id,
      },
      include: {
        pagos: true,
        paciente: true,
      },
    })
    return { success: true, procedimiento: all }
  } catch (error) {
    return { success: false }
  }
}

interface CreateProcedimientoProps {
  start: Date
  end: Date
  tratamientoId: string
  patientId: string
}

export const CreateProcedimiento = async (params: CreateProcedimientoProps) => {
  try {
    const tratamientoId = await prisma.tratamiento.findUnique({
      where: {
        id: params.tratamientoId,
      },
    })

    await prisma.procedimiento.create({
      data: {
        start: params.start,
        end: params.end,
        pacienteId: params.patientId,
        monto_total: tratamientoId?.monto!,
        title: tratamientoId?.nombre!,
        desc: tratamientoId?.descripcion!,
      },
    })
    revalidatePath('/dashboard/patient/[id]/procedimientos')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
export const DeleteProcedimiento = async (id: string) => {
  try {
    await prisma.procedimiento.delete({
      where: {
        id,
      },
    })
    revalidatePath('/dashboard/patient/[id]/procedimientos')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const ChangeStatusProcedimiento = async (
  id: string,
  status: StatusProcedimiento
) => {
  try {
    await prisma.procedimiento.update({
      where: {
        id,
      },
      data: {
        estado: status,
      },
    })
    revalidatePath('/dashboard/patient/[id]/procedimiento/[idProcedimiento]')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
