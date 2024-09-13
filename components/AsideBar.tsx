import {
  BadgeDollarSign,
  BadgeIndianRupee,
  BookHeart,
  BriefcaseMedical,
  Calendar,
  LayoutDashboard,
  NotepadTextDashed,
  PackageSearch,
  Rows3,
  UserRoundCog,
  UsersRound,
} from 'lucide-react'
import OptionBar from './OptionBar'
import { getSession } from '@/lib/helpers/getSession'

const itemsAdminBar = [
  {
    id: '641f77f8-141f-4292-8727-f92f6859bfd6',
    href: '/dashboard/users',
    label: 'Usuarios',
    icon: <UserRoundCog size={15} />,
  },
  {
    id: '1d6f9bc0-8712-4f38-ba3a-e622c6b4ed7c',
    href: '/dashboard/patients',
    label: 'Pacientes',
    icon: <UsersRound size={15} />,
  },
  {
    id: '11af85ec-285b-4ce6-9252-d3048c936348',
    href: '/dashboard/treatments',
    label: 'Tratamientos',
    icon: <Rows3 size={15} />,
  },
  {
    id: '4cca19ee-6470-450f-99c5-e2b471238249',
    href: '/dashboard/diagnosis',
    label: 'Diagnósticos',
    icon: <BookHeart size={15} />,
  },
  {
    id: '08b57372-7837-4404-acd3-59c18ae78368',
    href: '/dashboard/insumos',
    label: 'Insumos',
    icon: <PackageSearch size={15} />,
  },
  {
    id: 'e65d25c5-0932-485e-ae61-e8a29b764c84',
    href: '/dashboard/dates',
    label: 'Citas',
    icon: <Calendar size={15} />,
  },
  {
    id: '02dd14c2-aaf4-4e3c-a713-d165c91c86e8',
    href: '/dashboard/finance',
    label: 'Finanzas',
    icon: <BadgeDollarSign size={15} />,
  },
  {
    id: '57eab79a-8686-4273-a37f-109c0b99afbc',
    href: '/dashboard/templates',
    label: 'Plantillas',
    icon: <NotepadTextDashed size={15} />,
  },
  {
    id: '49e6bbf8-a953-49e0-b6ac-14f99e66d67b',
    href: '/dashboard/doctors',
    label: 'Doctores',
    icon: <BriefcaseMedical size={15} />,
  },
]
const itemsDoctorBar = [
  {
    id: '1d6f9bc0-8712-4f38-ba3a-e622c6b4ed7c',
    href: '/dashboard/patients',
    label: 'Pacientes',
    icon: <UsersRound size={15} />,
  },
  {
    id: '11af85ec-285b-4ce6-9252-d3048c936348',
    href: '/dashboard/treatments',
    label: 'Tratamientos',
    icon: <Rows3 size={15} />,
  },
  {
    id: '4cca19ee-6470-450f-99c5-e2b471238249',
    href: '/dashboard/diagnosis',
    label: 'Diagnósticos',
    icon: <BookHeart size={15} />,
  },
  {
    id: 'e65d25c5-0932-485e-ae61-e8a29b764c84',
    href: '/dashboard/dates',
    label: 'Citas',
    icon: <Calendar size={15} />,
  },
]

const itemsSecreBar = [
  {
    id: '1d6f9bc0-8712-4f38-ba3a-e622c6b4ed7c',
    href: '/dashboard/patients',
    label: 'Pacientes',
    icon: <UsersRound size={15} />,
  },
  {
    id: '11af85ec-285b-4ce6-9252-d3048c936348',
    href: '/dashboard/treatments',
    label: 'Tratamientos',
    icon: <Rows3 size={15} />,
  },
  {
    id: '4cca19ee-6470-450f-99c5-e2b471238249',
    href: '/dashboard/diagnosis',
    label: 'Diagnósticos',
    icon: <BookHeart size={15} />,
  },
  {
    id: '08b57372-7837-4404-acd3-59c18ae78368',
    href: '/dashboard/insumos',
    label: 'Insumos',
    icon: <PackageSearch size={15} />,
  },
  {
    id: 'e65d25c5-0932-485e-ae61-e8a29b764c84',
    href: '/dashboard/dates',
    label: 'Citas',
    icon: <Calendar size={15} />,
  },
  {
    id: '02dd14c2-aaf4-4e3c-a713-d165c91c86e8',
    href: '/dashboard/finance',
    label: 'Finanzas',
    icon: <BadgeDollarSign size={15} />,
  },
]

const AsideBar = async () => {
  /* @ts-ignore */
  const data = await getSession()
  return (
    <aside className="min-w-[44px]">
      <nav className="flex-col text-white h-[calc(100svh-24px)] sticky top-3 bg-primary rounded-2xl p-2 flex">
        <div className="flex-1 flex flex-col">
          <div className="h-[200px]">
            <OptionBar
              href="/dashboard"
              label="Home"
              icon={<LayoutDashboard size={16} />}
            />
          </div>
          {/* @ts-ignore */}
          {data?.user.role == 'administrador' && (
            <div className="flex flex-col gap-1">
              {itemsAdminBar.map(item => (
                <OptionBar key={item.id} {...item} />
              ))}
            </div>
          )}
          {/* @ts-ignore */}
          {data?.user.role == 'secretaria' && (
            <div className="flex flex-col gap-1">
              {itemsSecreBar.map(item => (
                <OptionBar key={item.id} {...item} />
              ))}
            </div>
          )}
          {/* @ts-ignore */}
          {data?.user.role == 'doctor' && (
            <div className="flex flex-col gap-1">
              {itemsDoctorBar.map(item => (
                <OptionBar key={item.id} {...item} />
              ))}
            </div>
          )}
        </div>
        <div className="flex"></div>
      </nav>
    </aside>
  )
}

export default AsideBar
