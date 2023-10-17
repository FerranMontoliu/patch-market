import { ReactElement } from 'react'
import { Container, Title } from '@mantine/core'
import { AuthProvider,useAuth } from '../contexts/AuthContext';



const MyTradesScreen = (): ReactElement => {
  const authContext = useAuth();
  return (
    <Container>
      <Title order={1}>My trades</Title>
      {authContext.isLoggedIn ? (
          <>/* You're currently logged in // FILL content IN HERE */ </>
        ) : (
          <p>You are not logged in. Please log in to view your trades.</p>
        )}
    </Container>
  )
}

export default MyTradesScreen

