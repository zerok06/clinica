import React from 'react'
import type { Diente } from '@/hook/useOdontograma'

const Tooth: React.FC<Diente> = ({ code, diagnostico, id, image, name }) => {
  return (
    <div
      className="w-[40px] flex items-center flex-col"
      title={code.toString()}
      key={id}
    >
      <p className="text-xs text-primary/60">{code}</p>
      <img src={image} className="w-[40px] h-[61px]" />
    </div>
  )
}

export default Tooth
