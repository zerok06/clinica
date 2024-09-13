'use server'
import { OdontogramaProps } from '@/hook/useOdontograma'
import prisma from '@/lib/prisma'
import { TipoDienteEnum } from '@/lib/types'
import { diente } from '@prisma/client'

export const fetchOdontograma = async () => {
  try {
    const all = await prisma.odontograma.findMany()

    return { success: true, odontogramas: all }
  } catch (error) {
    return { success: false }
  }
}

export const fetchOneOdontograma = async (id: string) => {
  try {
    const all = await prisma.odontograma.findUnique({
      where: {
        id,
      },
    })

    return { success: true, odontograma: all }
  } catch (error) {
    return { success: false }
  }
}

export const fetchPacienteOdontograma = async (id: string) => {
  try {
    const all = await prisma.odontograma.findMany({
      where: {
        pacienteId: id,
      },
    })

    return { success: true, odontogramas: all }
  } catch (error) {
    return { success: false }
  }
}

export const createOdontograma = async (
  odontograma: OdontogramaProps,
  id: string
) => {
  const newOdontograma = await prisma.odontograma.create({
    data: {
      pacienteId: id,
    },
  })
  const dientes = odontograma.permanentes
    .map(item => ({
      props: {
        code: item.code,
        name: item.name,
        tipo: 'Permanente' as TipoDienteEnum,
        odontogramaId: newOdontograma.id,
      },
      diag: item.diagnostico.map(e => ({
        base64: e.base64,
        desc: e.desc,
        name: e.name,
        nomeclatura: e.nomenclatura || undefined,
      })),
    }))
    .concat(
      odontograma.permanentes.map(item => ({
        props: {
          code: item.code,
          name: item.name,
          tipo: 'Permanente' as TipoDienteEnum,
          odontogramaId: newOdontograma.id,
        },
        diag: item.diagnostico.map(e => ({
          base64: e.base64,
          desc: e.desc,
          name: e.name,
          nomeclatura: e.nomenclatura || undefined,
        })),
      }))
    )

  console.log(newOdontograma.id)

  dientes.forEach(async item => {
    const newDiente = await prisma.diente.create({
      data: {
        ...item.props,
      },
    })
    item.diag.forEach(async e => {
      const newDiags = await prisma.diagnosticoMonoDiente.create({
        data: { ...e, dienteId: newDiente.id },
      })
    })
  })

  try {
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const deleteOdontograma = async (id: string) => {
  try {
    await prisma.odontograma.delete({
      where: { id },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
