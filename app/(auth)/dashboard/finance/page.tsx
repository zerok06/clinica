import FormFinance from '@/components/finance/FormFinance'
import { fetchPagos } from '@/lib/actions/pagos'
import React from 'react'

const Page = async () => {
  const { pagos } = await fetchPagos()
  return <FormFinance pagos={pagos!} />
}

export default Page
