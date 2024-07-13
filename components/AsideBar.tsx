import OptionBar from './OptionBar'
import { ArrangeIcon } from './icons/ArrangeIcon'
import { DashboardSquare02Icon } from './icons/DashboardSquare02Icon'
import { Note02Icon } from './icons/Note02Icon'
import { UserGroupIcon } from './icons/UserGroupIcon'
import { UserLock01Icon } from './icons/UserLock01Icon'

const itemsBar = [
  {
    id: '641f77f8-141f-4292-8727-f92f6859bfd6',
    href: '/dashboard/users',
    label: 'Usuarios',
    icon: <UserLock01Icon />,
  },
  {
    id: '1d6f9bc0-8712-4f38-ba3a-e622c6b4ed7c',
    href: '/dashboard/patients',
    label: 'Pacientes',
    icon: <UserGroupIcon />,
  },
  {
    id: '11af85ec-285b-4ce6-9252-d3048c936348',
    href: '/dashboard/treatments',
    label: 'Tratamientos',
    icon: <ArrangeIcon />,
  },
  {
    id: '4cca19ee-6470-450f-99c5-e2b471238249',
    href: '/dashboard/diagnosis',
    label: 'Diagnósticos',
    icon: <Note02Icon />,
  },
]

const AsideBar = () => {
  return (
    <aside className="min-w-[60px]">
      <nav className="flex-col text-white h-[calc(100svh-24px)] sticky top-3 bg-primary rounded-2xl p-2 flex">
        <div className="flex-1 flex flex-col">
          <div className="h-[200px]">
            <OptionBar
              href="/dashboard"
              label="Home"
              icon={<DashboardSquare02Icon />}
            />
          </div>
          <div className="flex flex-col gap-1">
            {itemsBar.map(item => (
              <OptionBar key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div className="flex"></div>
      </nav>
    </aside>
  )
}

export default AsideBar
