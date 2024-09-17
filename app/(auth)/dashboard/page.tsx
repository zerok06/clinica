import CitasChart from '@/components/dashboard/citas'
import { PagosChart } from '@/components/dashboard/pagos'
import { PagoAnnoChart } from '@/components/dashboard/pagosAnno'
import { Button } from '@/components/ui/button'
import { fetchDashboard } from '@/lib/actions/dashboard'
import Link from 'next/link'
import React from 'react'

const Dashboard = async () => {
  const { dashboard } = await fetchDashboard()
  console.log(dashboard?.gruopCitas)

  return (
    <section>
      <section className="relative min-h-[160px] rounded-xl overflow-hidden p-4 md:p-6">
        <div className="z-10">
          <h1 className="text-lg font-semibold">Informacion importante</h1>
          <p className="text-xs text-black/70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
          </p> 
        </div>
        <div className="flex mt-4 flex-row gap-4 flex-wrap">
          <div className="p-4 bg-white rounded-lg min-w-[150px]">
            <h3 className="text-lg font-medium leading-tight">
              {dashboard?.countCitas}
            </h3>
            <p className="text-xs font-light text-black/70 leading-tight">
              Num. citas
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg min-w-[150px]">
            <h3 className="text-lg font-medium leading-tight">
              {dashboard?.countInsumos}
            </h3>
            <p className="text-xs font-light text-black/70 leading-tight">
              Num. Insumos
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg min-w-[150px]">
            <h3 className="text-lg font-medium leading-tight">
              {dashboard?.countPacientes}
            </h3>
            <p className="text-xs font-light text-black/70 leading-tight">
              Num. pacientes
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg min-w-[150px]">
            <h3 className="text-lg font-medium leading-tight">
              {dashboard?.countProcedimientos}
            </h3>
            <p className="text-xs font-light text-black/70 leading-tight">
              Num. procedimientos
            </p>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1638742385167-96fc60e12f59?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute h-full w-full object-cover opacity-70 top-0 left-0 select-none -z-10"
        />
      </section>
      <section className="flex gap-4 flex-wrap">
        <section className="mt-4 bg-white rounded-xl p-4 md:p-6 flex-1 min-w-[312px]">
          <h3 className="text-lg font-semibold">Pagos</h3>
          <CitasChart chartData={dashboard?.gruopCitas} />
        </section>
        <section className="mt-4 bg-white rounded-xl p-4 md:p-6 flex-1 min-w-[312px]">
          <PagosChart />
        </section>
        <section className="mt-4 bg-white rounded-xl p-4 md:p-6 flex-1 min-w-[312px]">
          <PagoAnnoChart />
        </section>
      </section>
      <section className="flex gap-4">
        <section className="mt-4 bg-white rounded-xl p-4 md:p-6 flex-1"></section>
        <section className="mt-4 bg-white rounded-xl p-4 md:p-6 w-[312px]">
          <div className="flex justify-between items-center">
            <h3>Pagos recientes</h3>
            <Link
              href={'/dashboard/finance'}
              className="hover:underline text-black/70  text-sm"
            >
              Ver mas
            </Link>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            {dashboard?.pagos.map(item => (
              <div
                className="py-1 flex justify-between items-center"
                key={item.id}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/20 rounded-lg"></div>
                  <div className="text-sm text-black/80 ">{item.title}</div>
                </div>
                <div className="text-xs font-semibold">PEN {item.monto}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </section>
  )
}

export default Dashboard
