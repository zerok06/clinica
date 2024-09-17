import { getSession } from '@/lib/helpers/getSession'
import Sidebar from './Sidebar'

const AsideBar = async () => {
  /* @ts-ignore */
  const data = await getSession()
  return <Sidebar data={data} />
}

export default AsideBar
