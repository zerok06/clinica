import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getSession } from '@/lib/helpers/getSession'
import NavBarIconOptions from './auth/NavBarIconOptions'

const NavBar = async () => {
  /* @ts-ignore */
  const data = await getSession()

  return (
    <nav className="flex justify-between h-14 sticky top-3 z-50 p-2 bg-white rounded-xl shadow-sm">
      <div> {/* {JSON.stringify(user)} */}</div>
      <div>
        <div className="px-1 py-1 rounded-full bg-primary/5 flex flex-row gap-2 items-center">
          <Avatar className="size-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-white">
              {/* @ts-ignore */}
              {data?.user.nombres[0]
                /* @ts-ignore */
                .concat(data?.user.apellidos[0])
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <p className="text-xs font-medium leading-none">
              {/* @ts-ignore */}
              {data?.user.nombres}
            </p>
            <p className="text-xs font-normal text-black/70 leading-none">
              {/* @ts-ignore */}
              {data?.user.dni}
            </p>
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
