import { useCookies } from 'react-cookie'

export function usePersistanceStore() {
  const [cookies, setCookie, removeCookie] = useCookies()

  const updateValue = (key: string, newValue: string, options?: undefined) => {
    setCookie(key, newValue, options || { path: '/', maxAge: 3600 * 8 })
  }

  const deleteValue = (key: string) => {
    removeCookie(key)
  }

  return { value: cookies, updateValue, deleteValue }
}
