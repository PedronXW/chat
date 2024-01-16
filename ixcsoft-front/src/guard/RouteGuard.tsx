import { Navigate } from 'react-router-dom'
import { usePersistanceStore } from '../hooks/usePersistanceStore'

interface RouteGuardInterface {
  page: JSX.Element
}

const RouteGuard = ({ page }: RouteGuardInterface) => {
  const tokenJwt = usePersistanceStore().value.token

  if (tokenJwt) {
    return page
  } else {
    return <Navigate to={'/login'} />
  }
}

export default RouteGuard
