'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Calendar, momentLocalizer, type Components } from 'react-big-calendar'
import moment from 'moment'
import './calendar.css'
import { doctor, paciente, type cita } from '@prisma/client'
import { Button } from '../ui/button'
/* import WhatsAppButton from '../Patients/WhatsAppButton' */
import { HelpCircle } from 'lucide-react'
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
import OpcionsPatientDates from './OpcionsPatientDates'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import FormatDate from '../FormatDate'

const localizer = momentLocalizer(moment)

interface CitaItem extends cita {
  doctor: doctor
  paciente: paciente
}

interface DatesProps {
  agenda: CitaItem[]
  doctors: doctor[]
}

const Dates: React.FC<DatesProps> = ({ agenda = [], doctors = [] }) => {
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
                      <div className="flex gap-2 items-center">
                        {/* @ts-ignore */}
                        {evt.event?.estado == 'Cancelado' && (
                          <Badge className="bg-[#DC3545]">Cancelada</Badge>
                        )}
                        {/* @ts-ignore */}
                        {evt.event?.estado == 'Completado' && (
                          <Badge className="bg-[#218838]">Completada</Badge>
                        )}
                        {/* @ts-ignore */}
                        {evt.event?.estado == 'Pendiente' && (
                          <Badge className="bg-[#FFD700]">Pendiente</Badge>
                        )}
                        {/* @ts-ignore */}
                        <OpcionsPatientDates id={evt.event?.id} />
                      </div>
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div>
                      <div className="pt-4">
                        {/* @ts-ignore */}
                        {evt.event?.pacienteId != null ? (
                          <>
                            <h3 className="text-base font-medium">
                              Datos de paciente
                            </h3>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Nombres</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.nombres}</p>
                              </div>
                              <div>
                                <Label>Apellidos</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.apellidos}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Direccion</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.direccion}</p>
                              </div>
                              <div>
                                <Label>Nacimiento</Label>
                                <FormatDate
                                  fecha={
                                    /* @ts-ignore */
                                    evt.event?.paciente.nacimiento
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Edad</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.edad}</p>
                              </div>
                              <div>
                                <Label>Dni</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.dni}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Celular</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.celular}</p>
                              </div>
                              <div>
                                <Label>Convenio</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.convenio}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="text-base font-medium">
                              Datos de paciente
                            </h3>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Nombres</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.nombres}
                                </p>
                              </div>
                              <div>
                                <Label>Apellidos</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.apellidos}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Direccion</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.direccion}
                                </p>
                              </div>
                              <div>
                                <Label>Nacimiento</Label>
                                <p>
                                  <FormatDate
                                    fecha={
                                      /* @ts-ignore */
                                      evt.event?.procedimiento.paciente
                                        .nacimiento
                                    }
                                  />
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Edad</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.procedimiento.paciente.edad}</p>
                              </div>
                              <div>
                                <Label>Dni</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.procedimiento.paciente.dni}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Celular</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.celular}
                                </p>
                              </div>
                              <div>
                                <Label>Convenio</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.convenio}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {/* @ts-ignore */}
                      {evt.event.procedimientoId != null && (
                        <div className="pt-4">
                          <h3 className="text-base font-medium">
                            Datos de procedimiento
                          </h3>
                          <div className="grid grid-cols-2">
                            <div>
                              <Label>Asunto</Label>
                              <p>
                                {/* @ts-ignore */}
                                {evt.event?.procedimiento.title}
                              </p>
                            </div>
                            <div>
                              <Label>Estado</Label>
                              <p>
                                {/* @ts-ignore */}
                                {evt.event?.procedimiento.estado}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div>
                              <Label>Inicio</Label>
                              <p>
                                <FormatDate
                                  fecha={
                                    /* @ts-ignore */
                                    evt.event?.procedimiento.start
                                  }
                                />
                              </p>
                            </div>
                            <div>
                              <Label>Final</Label>
                              <p>
                                <FormatDate
                                  fecha={
                                    /* @ts-ignore */
                                    evt.event?.procedimiento.end
                                  }
                                />
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div>
                              <Label>Monto</Label>
                              <p>
                                {/* @ts-ignore */}
                                {evt.event?.procedimiento.monto_total}
                              </p>
                            </div>
                            <div>
                              <Label>Recaudado</Label>
                              <p>
                                {/* @ts-ignore */}
                                {evt.event?.procedimiento.recaudado}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* @ts-ignore */}
                    <p>{evt.event.desc}</p>
                    {/* @ts-ignore */}
                    {/* <div>{JSON.stringify(evt.event)}</div> */}
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
                    <div>
                      <div className="pt-4">
                        {/* @ts-ignore */}
                        {evt.event?.pacienteId != null ? (
                          <>
                            <h3 className="text-base font-medium">
                              Datos de paciente
                            </h3>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Nombres</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.nombres}</p>
                              </div>
                              <div>
                                <Label>Apellidos</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.apellidos}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Direccion</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.direccion}</p>
                              </div>
                              <div>
                                <Label>Nacimiento</Label>
                                <FormatDate
                                  fecha={
                                    /* @ts-ignore */
                                    evt.event?.paciente.nacimiento
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Edad</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.edad}</p>
                              </div>
                              <div>
                                <Label>Dni</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.dni}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Celular</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.celular}</p>
                              </div>
                              <div>
                                <Label>Convenio</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.paciente.convenio}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="text-base font-medium">
                              Datos de paciente
                            </h3>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Nombres</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.nombres}
                                </p>
                              </div>
                              <div>
                                <Label>Apellidos</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.apellidos}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Direccion</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.direccion}
                                </p>
                              </div>
                              <div>
                                <Label>Nacimiento</Label>
                                <p>
                                  <FormatDate
                                    fecha={
                                      /* @ts-ignore */
                                      evt.event?.procedimiento.paciente
                                        .nacimiento
                                    }
                                  />
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Edad</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.procedimiento.paciente.edad}</p>
                              </div>
                              <div>
                                <Label>Dni</Label>
                                {/* @ts-ignore */}
                                <p>{evt.event?.procedimiento.paciente.dni}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div>
                                <Label>Celular</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.celular}
                                </p>
                              </div>
                              <div>
                                <Label>Convenio</Label>
                                <p>
                                  {/* @ts-ignore */}
                                  {evt.event?.procedimiento.paciente.convenio}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {/* @ts-ignore */}
                      {evt.event.procedimientoId != null && (
                        <div className="pt-4">
                          <h3 className="text-base font-medium">
                            Datos de procedimiento
                          </h3>
                          <div className="grid grid-cols-2">
                            <div>
                              <Label>Asunto</Label>
                              <p>
                                {/* @ts-ignore */}
                                {evt.event?.procedimiento.title}
                              </p>
                            </div>
                            <div>
                              <Label>Estado</Label>
                              <p>
                                {/* @ts-ignore */}
                                {evt.event?.procedimiento.estado}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div>
                              <Label>Inicio</Label>
                              <p>
                                <FormatDate
                                  fecha={
                                    /* @ts-ignore */
                                    evt.event?.procedimiento.start
                                  }
                                />
                              </p>
                            </div>
                            <div>
                              <Label>Final</Label>
                              <p>
                                <FormatDate
                                  fecha={
                                    /* @ts-ignore */
                                    evt.event?.procedimiento.end
                                  }
                                />
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div>
                              <Label>Monto</Label>
                              <p>
                                {/* @ts-ignore */}
                                {evt.event?.procedimiento.monto_total}
                              </p>
                            </div>
                            <div>
                              <Label>Recaudado</Label>
                              <p>
                                {/* @ts-ignore */}
                                {evt.event?.procedimiento.recaudado}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* @ts-ignore */}
                    <p>{evt.event.desc}</p>
                    {/* @ts-ignore */}
                    {/* <div>{JSON.stringify(evt.event)}</div> */}
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
                {/* @ts-ignore */}
                {evt.event?.pacienteId != null ? (
                  <div className="flex flex-col justify-center">
                    <p className="text-sm leading-tight">
                      {/* @ts-ignore */}
                      {evt.event?.paciente.nombres}
                    </p>
                    <p className="text-xs leading-none">
                      {/* @ts-ignore */}
                      {evt.event?.paciente.dni}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center">
                    <p className="text-sm leading-tight">
                      {/* @ts-ignore */}
                      {evt.event?.procedimiento.paciente.nombres}
                    </p>
                    <p className="text-xs leading-none">
                      {/* @ts-ignore */}
                      {evt.event?.procedimiento.paciente.dni}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end items-center gap-2">
              {/* <WhatsAppButton tel={'+51910852459'} /> */}
              <div>
                <div className="flex gap-2 items-center">
                  {/* @ts-ignore */}
                  {evt.event?.estado == 'Cancelado' && (
                    <Badge className="bg-[#DC3545]">Cancelada</Badge>
                  )}
                  {/* @ts-ignore */}
                  {evt.event?.estado == 'Completado' && (
                    <Badge className="bg-[#218838]">Completada</Badge>
                  )}
                  {/* @ts-ignore */}
                  {evt.event?.estado == 'Pendiente' && (
                    <Badge className="bg-[#FFD700]">Pendiente</Badge>
                  )}
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

  const [filters, setFilters] = useState({
    doctor: 'todos',
  })

  let filteredData: CitaItem[] = useMemo(() => {
    if (filters.doctor !== 'todos') {
      return agenda.filter(item => item.doctorId == filters.doctor)
    }
    return agenda
  }, [filters])

  const messages = {
    week: 'Semana',
    work_week: 'Semana de trabajo',
    day: 'Día',
    month: 'Mes',
    previous: 'Atrás',
    next: 'Después',
    today: 'Hoy',
    agenda: 'Agenda',

    showMore: (total: number) => `+${total} más`,
  }

  return (
    <div>
      <div>
        <h3>Filtros</h3>
        <div className="py-3">
          <Label>Doctor</Label>
          <Select
            onValueChange={value =>
              setFilters(state => ({ ...state, doctor: value }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {doctors.map(item => (
                <SelectItem value={item.id}>Dr(a).{item.nombres}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-[450px]">
        <Calendar
          localizer={localizer}
          events={filteredData}
          /* @ts-ignore */
          components={components}
          messages={messages}
          min={new Date(1972, 0, 1, 8, 0, 0, 0)}
          max={new Date(1972, 0, 1, 21, 0, 0, 0)}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  )
}

export default Dates
