import Link from 'next/link'
import React from 'react'

const ITEMS = [
  {
    id: '6bc00f48-1ea5-41b2-a08b-213ff3799ea7',
    slug: 'resume',
    label: 'Resumen',
  },
  {
    id: 'ec265cf5-54a8-45bd-9850-87035499fb03',
    slug: 'odontogram',
    label: 'Odontograma',
  },
  {
    id: '6c35303d-330a-4a66-b4c7-0540110e395c',
    slug: 'dates',
    label: 'Citas',
  },
  {
    id: '33fc0c73-8abf-4a49-9212-afaa7fdede0e',
    slug: 'procedimientos',
    label: 'Procedimientos',
  },
  {
    id: 'a84d92e2-31d2-4fc2-96ae-fa22bb380034',
    slug: 'history',
    label: 'Historia',
  },
  {
    id: '62803ef8-9dc7-4ec9-bc22-f3c78880ad7d',
    slug: 'radiograph',
    label: 'Radiografías',
  },
  {
    id: '959c1a64-bdce-440b-b1c4-1b45d4b60e44',
    slug: 'files',
    label: 'Archivos',
  },
]

const generateUrl = (id: string, slug: string) =>
  `/dashboard/patient/${id}/${slug}`

interface NavbarProps {
  idPatient: string
}

const Navbar: React.FC<NavbarProps> = ({ idPatient }) => {
  return (
    <div className="w-full p-3 rounded-2xl bg-white mb-3 flex justify-between items-center">
      <div>Paciente</div>
      <div className="flex items-center gap-2">
        {ITEMS.map(({ id, label, slug }) => (
          <Link
            key={id}
            href={generateUrl(idPatient, slug)}
            className="hover:bg-primary/5 px-2 py-1 rounded-md text-xs text-primary/80"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Navbar
