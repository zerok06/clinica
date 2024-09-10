import Odontograma from '@/components/patients/Odontograma'
import { fetchTreatments } from '@/lib/actions/treatments'
import React from 'react'
interface PagePatientProps {
  params: { id: string }
}
const Page: React.FC<PagePatientProps> = async ({ params: { id } }) => {
  const { tratamientos } = await fetchTreatments()
  return (
    <div>
      <Odontograma tratamientos={tratamientos!} id={id} />
    </div>
  )
}

export default Page
