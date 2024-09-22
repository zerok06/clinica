import type { PlantillaMensaje } from '@prisma/client'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'

export interface FormatMessageCitaProps {
  title: string
  start: Date | string
  end: Date | string
  pacienteNombres: string
  pacienteApellidos: string
}

export const FormatMessageCita = (
  plantilla: PlantillaMensaje,
  params: FormatMessageCitaProps
) => {
  params.start = format(params.start, 'PPpp', {
    locale: es,
  })
  params.end = format(params.end, 'PPpp', {
    locale: es,
  })

  let text = plantilla.mensaje
  const regex = new RegExp(Object.keys(params).join('|'), 'g')

  // Usamos el método replace con una función como segundo argumento
  /* @ts-ignore */
  return text.replace(regex, matched => params[matched])
}
