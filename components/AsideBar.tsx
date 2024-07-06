import OptionBar from './OptionBar'
import { DashboardSquare02Icon } from './icons/DashboardSquare02Icon'
import { UserMultipleIcon } from './icons/UserMultipleIcon'

const itemsBar = [
  {
    href: '/dashboard/users',
    label: 'Usuarios',
    icon: <UserMultipleIcon />,
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
          <div>
            {itemsBar.map(item => (
              <OptionBar {...item} />
            ))}
          </div>
        </div>
        <div className="flex"></div>
      </nav>
    </aside>
  )
}

export default AsideBar
