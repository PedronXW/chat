import { Chat } from '../components/Chat'
import { ClientNavigator } from '../components/ClientNavigator'
import { Header } from '../components/Header'

export const Home = () => {
  return (
    <div className="h-svh flex flex-col bg-gray-200 gap-2">
      <Header />
      <main className="w-full flex flex-1 gap-2 overflow-hidden gap-2">
        <ClientNavigator />
        <Chat />
      </main>
    </div>
  )
}
