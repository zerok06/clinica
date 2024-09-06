import ButtonNewDate from '@/components/dates/ButtonNewDate'
import { Separator } from '@/components/ui/separator'
import { fetchDates } from '@/lib/actions/dates'
import { fetchPatients } from '@/lib/actions/patients'
import DATA from '@/lib/config/labels.json'
import React from 'react'
import Dates from '../../../../components/dates/Dates'

const { citas: Cit } = DATA

const Page = async () => {
  const { patients } = await fetchPatients()
  const { dates } = await fetchDates()

  return (
    <div className="py-3 px-4 rounded-xl bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-lg">{Cit.title}</h2>
          <p className="text-black/70 text-sm">{Cit.desc}</p>
        </div>
        <ButtonNewDate pacientes={patients!} type={'particular'} />
      </div>
      <Separator className="my-3" />
      <Dates agenda={dates!} />
    </div>
  )
}

export default Page
