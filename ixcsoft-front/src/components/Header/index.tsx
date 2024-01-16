import { SignOut } from '@phosphor-icons/react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../../contexts/SocketContext'
import { usePersistanceStore } from '../../hooks/usePersistanceStore'

export const Header = () => {
  const { deleteValue } = usePersistanceStore()
  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)

  const handleLogout = () => {
    socket.disconnect()
    deleteValue('token_ixsoft_test_authentication')
    navigate('/login')
  }

  return (
    <header className="h-16 w-full flex grow-0 flex-none bg-white items-center px-4 shadow-md justify-between">
      <h1 className="text-3xl font-bold underline">IXCSOFT-TESTE</h1>
      <button>
        <SignOut
          size={20}
          className="text-primary_color"
          onClick={handleLogout}
        />
      </button>
    </header>
  )
}
