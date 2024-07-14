import Navbar from '@/components/patients/Navbar'
import React from 'react'

interface LayoutPatientProps {
  children?: React.ReactNode
  params: { id: string }
}

const LayoutPatient: React.FC<LayoutPatientProps> = ({
  children,
  params: { id },
}) => {
  return (
    <section>
      <Navbar idPatient={id} />
      {children}
    </section>
  )
}

export default LayoutPatient
