import Odontograma from '@/components/patients/Odontograma'
import { fetchDiagnosis } from '@/lib/actions/diagnosis'
import { fetchTreatments } from '@/lib/actions/treatments'
import React from 'react'
interface PagePatientProps {
  params: { id: string }
}
const Page: React.FC<PagePatientProps> = async ({ params: { id } }) => {
  const { diagnoses } = await fetchDiagnosis()
  return (
    <div>
      <Odontograma diagnoses={diagnoses!} id={id} />
    </div>
  )
}

export default Page
