import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getSession } from '@/lib/helpers/getSession'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import NavBarIconOptions from './auth/NavBarIconOptions'

const NavBar = async () => {
  /* @ts-ignore */
  const { user } = await getSession()

  return (
    <nav className="flex justify-between h-14 sticky top-3  p-2">
      <div> {/* {JSON.stringify(user)} */}</div>
      <div>
        <div className="px-1 py-1 rounded-full bg-primary/5 flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>
              {user.nombres[0].concat(user.apellidos[0]).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <p className="text-xs font-medium">{user.nombres}</p>
            <p className="text-xs font-normal text-black/70">{user.dni}</p>
          </div>
          <div className="flex">
            <NavBarIconOptions />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
