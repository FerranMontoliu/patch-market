import { UserAction } from '../contexts/UserContext.tsx'
import { Dispatch } from 'react'

export const logout = (userDispatch:  Dispatch<UserAction>) => {
  window.localStorage.removeItem('patchMarketUser')
  userDispatch({ type: 'LOGOUT_USER' })
}
