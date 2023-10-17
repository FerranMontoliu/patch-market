import { ReactElement } from 'react'
import { Container, Title } from '@mantine/core'
import { AuthProvider,useAuth } from '../contexts/AuthContext';




const AddPatchScreen = (): ReactElement => {
  const authContext = useAuth();

  return (


    <Container>
      {authContext.isLoggedIn ? (

      <Title order={1}>Add a new patch</Title>






























      ) : (
      <p>You are not logged in. Please log in to view your trades.</p>
    )}


    </Container>
  )
}

export default AddPatchScreen
