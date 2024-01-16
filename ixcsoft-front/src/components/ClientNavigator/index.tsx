import { ClientList } from '../Lists/ClientList'
import { ClientListHeader } from '../Lists/ClientList/ClientListHeader'

export const ClientNavigator = () => {
  return (
    <nav className="w-[28rem] bg-white shadow-md h-full flex flex-col pl-2">
      <ClientListHeader />
      <ClientList />
    </nav>
  )
}
