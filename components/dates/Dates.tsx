'use client'
import React, { useMemo } from 'react'
import { Calendar, momentLocalizer, type Components } from 'react-big-calendar'
import moment from 'moment'
import './calendar.css'
import { type cita } from '@prisma/client'
import { Button } from '../ui/button'
/* import WhatsAppButton from '../Patients/WhatsAppButton' */
import { X, Bolt, HelpCircle, ChevronRight } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
/* import { DeleteDates } from '@/lib/actions/agenda' */
import Link from 'next/link'
import OpcionsPatientDates from './OpcionsPatientDates'
import { Configuration01Icon } from '../icons/Configuration01Icon'

const localizer = momentLocalizer(moment)

interface DatesProps {
  agenda: cita[]
}

const Dates: React.FC<DatesProps> = ({ agenda = [] }) => {
  const components: Components = useMemo(
    () => ({
      month: {
        /* @ts-ignore */
        event: evt => (
          <div className="flex items-center gap-2">
            {evt.event.title}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={'icon'} className="h-5 w-5" variant={'ghost'}>
                  <HelpCircle size={18} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="flex justify-between items-center">
                      <p>{evt.event.title}</p>
                      <p className="font-normal text-black/80 text-sm">
                        {/* @ts-ignore */}
                        {evt.event.start.toLocaleTimeString('es', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hourCycle: 'h12',
                        })}
                        - {/* @ts-ignore */}
                        {evt.event.end.toLocaleTimeString('es', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hourCycle: 'h12',
                        })}
                      </p>
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex justify-between items-center py-2">
                      <div className="flex gap-3">
                        <img
                          src="/assets/images/default.jpg"
                          className="h-10 w-10 rounded-full"
                          alt=""
                        />
                        <div className="flex flex-col justify-center">
                          <p className="text-sm leading-tight">
                            Jose Paye Mamani
                          </p>
                          <p className="text-xs leading-none">73736059</p>
                        </div>
                      </div>
                      <div>
                        {/* @ts-ignore */}
                        {evt.event?.estado == 'Cancelado' && (
                          <div className="px-4 py-1 text-black/70 rounded-lg bg-[#DC3545]">
                            Cancelada
                          </div>
                        )}
                        {/* @ts-ignore */}
                        {evt.event?.estado == 'Completado' && (
                          <div className="px-4 py-1 text-black/70 rounded-lg bg-[#218838]">
                            Completada
                          </div>
                        )}
                        {/* @ts-ignore */}
                        {evt.event?.estado == 'Pendiente' && (
                          <div className="px-4 py-1 text-black/70 rounded-lg bg-[#FFD700]">
                            Pendiente
                          </div>
                        )}
                      </div>
                      <div>
                        {/* @ts-ignore */}
                        <OpcionsPatientDates id={evt.event?.id} />
                      </div>
                    </div>
                    {/* @ts-ignore */}
                    <p>{evt.event.desc}</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ),
      },
      day: {
        /* @ts-ignore */
        event: evt => (
          <div className="flex items-center gap-2">
            {evt.event.title}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={'icon'} className="h-5 w-5" variant={'ghost'}>
                  <HelpCircle size={18} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    <div className="flex justify-between items-center">
                      <p>{evt.event.title}</p>
                      <p className="font-normal text-black/80 text-sm">
                        {/* @ts-ignore */}
                        {evt.event.start.toLocaleTimeString('es', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hourCycle: 'h12',
                        })}{' '}
                        - {/* @ts-ignore */}
                        {evt.event.end.toLocaleTimeString('es', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hourCycle: 'h12',
                        })}
                      </p>
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex justify-between items-center py-2">
                      <div className="flex gap-3">
                        <img
                          src="/assets/images/default.jpg"
                          className="h-10 w-10 rounded-full"
                          alt=""
                        />
                        <div className="flex flex-col justify-center">
                          <p className="text-sm leading-tight">
                            Jose Paye Mamani
                          </p>
                          <p className="text-xs leading-none">73736059</p>
                        </div>
                      </div>
                      <div className="flex justify-end items-center gap-2">
                        {/* <WhatsAppButton tel={'+51910852459'} /> */}
                        <div>
                          <div>
                            {/* @ts-ignore */}
                            {evt.event?.estado == 'Cancelado' && (
                              <div className="px-4 py-1 text-black/70 rounded-lg bg-[#DC3545]">
                                Cancelada
                              </div>
                            )}
                            {/* @ts-ignore */}
                            {evt.event?.estado == 'Completado' && (
                              <div className="px-4 py-1 text-black/70 rounded-lg bg-[#218838]">
                                Completada
                              </div>
                            )}
                            {/* @ts-ignore */}
                            {evt.event?.estado == 'Pendiente' && (
                              <div className="px-4 py-1 text-black/70 rounded-lg bg-[#FFD700]">
                                Pendiente
                              </div>
                            )}
                          </div>
                          <div>
                            {/* @ts-ignore */}
                            <OpcionsPatientDates id={evt.event?.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* @ts-ignore */}
                    <p>{evt.event.desc}</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ),
      },
      agenda: {
        /* @ts-ignore */
        event: evt => (
          <div className=" py-2 flex justify-between items-center">
            <div>
              <p>
                Tema: <span className="font-medium">{evt.event.title}</span>
              </p>
              <div className="flex gap-3">
                <img
                  src="/assets/images/default.jpg"
                  className="h-10 w-10 rounded-full"
                  alt=""
                />
                <div className="flex flex-col justify-center">
                  <p className="text-sm leading-tight">Jose Paye Mamani</p>
                  <p className="text-xs leading-none">73736059</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-2">
              {/* <WhatsAppButton tel={'+51910852459'} /> */}
              <div>
                <div>
                  {/* @ts-ignore */}
                  {evt.event?.estado == 'Cancelado' && (
                    <div className="px-4 py-1 text-black/70 rounded-lg bg-[#DC3545]">
                      Cancelada
                    </div>
                  )}
                  {/* @ts-ignore */}
                  {evt.event?.estado == 'Completado' && (
                    <div className="px-4 py-1 text-black/70 rounded-lg bg-[#218838]">
                      Completada
                    </div>
                  )}
                  {/* @ts-ignore */}
                  {evt.event?.estado == 'Pendiente' && (
                    <div className="px-4 py-1 text-black/70 rounded-lg bg-[#FFD700]">
                      Pendiente
                    </div>
                  )}
                </div>
                <div>
                  {/* @ts-ignore */}
                  <OpcionsPatientDates id={evt.event?.id} />
                </div>
              </div>
            </div>
          </div>
        ),
      },
    }),
    []
  )

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={agenda}
        /* @ts-ignore */
        components={components}
        min={new Date(1972, 0, 1, 8, 0, 0, 0)}
        max={new Date(1972, 0, 1, 21, 0, 0, 0)}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}

export default Dates
