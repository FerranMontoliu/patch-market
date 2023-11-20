import { useUserDispatch } from '../contexts/UserContext.tsx'
import { logout } from '../utils/logout.ts'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'

const LogoutScreen = (): null => {
  const userDispatch = useUserDispatch()

  useEffect(() => {
    logout(userDispatch)

    notifications.clean()
    notifications.show({
      title: 'Your session has expired',
      message: 'You have been logged out. Please log in again to resume browsing.',
      color: 'red'
    })
  }, [userDispatch])

  return null
}

export default LogoutScreen
