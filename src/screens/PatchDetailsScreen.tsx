import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Stack, Title } from '@mantine/core'

const PatchDetailsScreen = (): ReactElement => {
  const { patchId } = useParams()

  return (
    <Container>
      <Stack>
        <Title order={1}>Patch details</Title>
        <Title order={4}>ID: {patchId}</Title>
      </Stack>
    </Container>
  )
}

export default PatchDetailsScreen
