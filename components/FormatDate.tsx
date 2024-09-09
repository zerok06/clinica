import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import React from 'react'

interface FormatDateProps {
  fecha: Date
}

const FormatDate: React.FC<FormatDateProps> = ({ fecha }) => {
  return (
    <time dateTime={fecha.toDateString()} className="text-xs">
      {format(fecha, 'PPpp', {
        locale: es,
      })}
    </time>
  )
}

export default FormatDate
