import React from 'react'

const Dashboard = () => {
  return (
    <section>
      <section className="relative min-h-[160px] rounded-xl overflow-hidden">
        <div className="z-10 md:p-6 p-4">
          <h1 className="text-lg font-semibold">Informacion importante</h1>
          <p className="text-xs text-black/70">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            nulla!
          </p>
        </div>
        <div>
          <div></div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1638742385167-96fc60e12f59?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="absolute h-full w-full object-cover opacity-70 top-0 left-0 select-none -z-10"
        />
      </section>
    </section>
  )
}

export default Dashboard
