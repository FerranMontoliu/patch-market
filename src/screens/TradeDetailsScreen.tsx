import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Stack, Title } from '@mantine/core'

const TradeDetailsScreen = (): ReactElement => {
  const { tradeId } = useParams()

  return (
    <Container>
      <Stack>
        <Title order={1}>Patch details</Title>
        <Title order={4}>ID: {tradeId}</Title>
      </Stack>
    </Container>
  )
}

export default TradeDetailsScreen
