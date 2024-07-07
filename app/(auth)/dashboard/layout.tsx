import AsideBar from '@/components/AsideBar'
import NavBar from '@/components/NavBar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <section className="flex min-h-svh p-3 gap-3 bg-primary/5">
      <AsideBar />
      <section className="flex-1  flex flex-col gap-3">
        <NavBar />
        <section>{children}</section>
      </section>
      <Toaster />
    </section>
  )
}

export default RootLayout
