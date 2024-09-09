'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const fetchPagos = async () => {
  try {
    const all = await prisma.pagos.findMany({
      include: {
        procedimiento: {
          include: {
            paciente: true,
          },
        },
      },
    })
    return { success: true, pagos: all }
  } catch (error) {
    return { success: false }
  }
}

export const fetchOnePagos = async (id: string) => {
  try {
    const all = await prisma.pagos.findUnique({
      where: {
        id,
      },
    })
    return { success: true, pago: all }
  } catch (error) {
    return { success: false }
  }
}

interface CreatePagoProps {
  title: string
  monto: string
  procedimientoId: string
  desc: string
}

export const CreatePago = async (params: CreatePagoProps) => {
  try {
    await prisma.pagos.create({
      data: {
        title: params.title,
        monto: Number(params.monto),
        desc: params.desc,
        procedimientoId: params.procedimientoId,
      },
    })

    await prisma.procedimiento.update({
      where: {
        id: params.procedimientoId,
      },
      data: {
        recaudado: {
          increment: Number(params.monto),
        },
      },
    })
    revalidatePath('/dashboard/finance')
    revalidatePath('/dashboard/patient/[id]/procedimiento/[idProcedimiento]')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
export const DeletePagos = async (id: string) => {
  try {
    const pago = await prisma.pagos.findUnique({ where: { id } })

    await prisma.pagos.delete({
      where: {
        id,
      },
    })

    await prisma.procedimiento.update({
      where: {
        id: pago?.procedimientoId,
      },
      data: {
        recaudado: {
          decrement: Number(pago?.monto),
        },
      },
    })

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
