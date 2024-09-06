'use server'
import prisma from '@/lib/prisma'
import fs from 'node:fs/promises'
import { nanoid } from 'nanoid'
import { revalidatePath } from 'next/cache'
import path from 'node:path'

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get('file') as File
    const id = formData.get('id') as string
    const fileExtension = path.extname(file.name)
    const filename = nanoid()
    const arrayBuffer = await file.arrayBuffer()
    const pathfile = `/uploads/${filename}${fileExtension}`
    const buffer = new Uint8Array(arrayBuffer)

    await prisma.file.create({
      data: {
        name: file.name,
        path: pathfile,
        pacienteId: id,
        type: file.type,
        size: file.size.toString(),
      },
    })
    await fs.writeFile(`./public/uploads/${filename}${fileExtension}`, buffer)
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export const fetchFilesPatient = async (id: string) => {
  try {
    const all = await prisma.file.findMany({
      where: {
        pacienteId: id,
      },
    })
    return { success: true, files: all }
  } catch (error) {
    return { success: false }
  }
}

export const deleteFilePatient = async (id: string) => {
  try {
    await prisma.file.delete({
      where: {
        id,
      },
    })
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}
