import Odontograma from '@/components/patients/Odontograma'
import { fetchTreatments } from '@/lib/actions/treatments'
import React from 'react'

const Page = async () => {
  const { tratamientos } = await fetchTreatments()
  return (
    <div>
      <Odontograma tratamientos={tratamientos!} />
    </div>
  )
}

export default Page
