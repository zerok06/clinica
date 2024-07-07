import OptionBar from './OptionBar'
import { DashboardSquare02Icon } from './icons/DashboardSquare02Icon'
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
