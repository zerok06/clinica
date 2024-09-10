'use server'
import prisma from '@/lib/prisma'

export const fetchDashboard = async () => {
  try {
    const { _count: countPacientes } = await prisma.paciente.aggregate({
      _count: true,
    })
    const { _count: countCitas } = await prisma.cita.aggregate({
      _count: true,
    })
    const { _count: countProcedimientos } =
      await prisma.procedimiento.aggregate({
        _count: true,
      })
    const { _count: countInsumos } = await prisma.insumo.aggregate({
      _count: true,
    })
    const { _sum: sumPagos } = await prisma.pagos.aggregate({
      _sum: {
        monto: true,
      },
    })

    /* parte 2 */

    const dataCitas = await prisma.cita.groupBy({
      by: ['estado'],
      _count: true,
    })

    const gruopCitas = dataCitas.map(item => ({
      type: item.estado,
      count: item._count,
      fill: `var(--color-${item.estado})`,
    }))

    /* Parte 4 */
    const pagos = await prisma.pagos.findMany({
      orderBy: {
        createAt: 'desc',
      },
      take: 5,
    })

    return {
      success: true,
      dashboard: {
        countPacientes,
        countCitas,
        countProcedimientos,
        countInsumos,
        sumPagos,
        gruopCitas,
        pagos,
      },
    }
  } catch (error) {
    return { success: false }
  }
}
