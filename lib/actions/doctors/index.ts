'use server'

import prisma from '@/lib/prisma'
import { doctor } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const fetchDoctors = async () => {
  try {
    const all = await prisma.doctor.findMany()
    return { success: true, doctors: all }
  } catch (error) {
    return { success: false }
  }
}

export const fetchOneDoctors = async (id: string) => {
  try {
    const all = await prisma.doctor.findMany({
      where: {
        id,
      },
    })
    return { success: true, doctor: all }
  } catch (error) {
    return { success: false }
  }
}

type CreateDoctor = Omit<doctor, 'updateAt' | 'createAt' | 'id'>

export const createDoctors = async (params: CreateDoctor) => {
  try {
    await prisma.doctor.create({
      data: params,
    })
    revalidatePath('/dashboard/doctors')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const deleteDoctors = async (id: string) => {
  try {
    await prisma.doctor.delete({ where: { id } })
    revalidatePath('/dashboard/doctors')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
