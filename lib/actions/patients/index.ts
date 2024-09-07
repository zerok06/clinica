'use server'
import prisma from '@/lib/prisma'

export const fetchResumePatient = async (id: string) => {
  try {
    const patient = await prisma.paciente.findUnique({
      where: { id },
    })

    const files = await prisma.file.findMany({
      where: {
        pacienteId: id,
      },
      take: 4,
    })

    const pagos = await prisma.pagos.findMany({
      where: {
        procedimiento: {
          pacienteId: id,
        },
      },
      take: 4,
    })
    const pagos_data = await prisma.pagos.aggregate({
      _sum: {
        monto: true,
      },
    })

    const citas = await prisma.cita.findMany({
      where: {
        procedimiento: {
          pacienteId: id,
        },
      },
      take: 4,
    })
    const citas_data = await prisma.cita.aggregate({
      _count: true,
    })

    return {
      success: true,
      data: {
        patient,
        files,
        pagos: {
          data: pagos,
          pagos_data,
        },
        citas: {
          data: citas,
          citas_data,
        },
      },
    }
  } catch (error) {
    return { success: false }
  }
}

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
