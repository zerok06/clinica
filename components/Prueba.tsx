import { getSession } from '@/lib/helpers/getSession'
import React from 'react'

const Prueba = async () => {
  const da = await getSession()

  return <div>{JSON.stringify(da)}</div>
}

export default Prueba
