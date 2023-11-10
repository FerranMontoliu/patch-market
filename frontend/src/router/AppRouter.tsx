import { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFoundScreen from '../screens/NotFoundScreen.tsx'
import { useIsLoadingValue, useUserValue } from '../contexts/UserContext.tsx'
import { User } from '../types.ts'
import { Center, Loader } from '@mantine/core'
import { AppRoute, privateRoutes, publicRoutes } from './routes.tsx'

const AppRouter = (): ReactElement | null => {
  const user : User | null = useUserValue()
  const isLoading: boolean = useIsLoadingValue()

  const isLoggedIn: boolean = user !== null

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  return (
    <Routes>
      {privateRoutes
        .map(({ path, element }: AppRoute): ReactElement => (
          <Route
            key={path}
            path={path}
            element={isLoggedIn
              ? element
              : <Navigate to="/log-in" />} />
        ))}

      {publicRoutes
        .map(({ path, element }: AppRoute): ReactElement => (
          <Route
            key={path}
            path={path}
            element={isLoggedIn
              ? <Navigate to="/" />
              : element} />
        ))}

      <Route path="*" element={<NotFoundScreen/>}/>
    </Routes>
  )
}

export default AppRouter
