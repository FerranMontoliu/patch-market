import { ReactElement } from 'react'
// import { useParams } from 'react-router-dom'
import { Button, Container, Divider, Group, Stack, Title } from '@mantine/core'
import PatchCard from '../components/PatchCard.tsx'
import { mockOwnPatches, mockPatches } from '../mock-data.ts'
import PatchGrid from '../components/PatchGrid.tsx'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'

const TradeDetailsScreen = (): ReactElement => {
  // const { tradeId } = useParams()
  const navigate = useNavigate()

  const onDecline = (): void => {
    notifications.show({
      title: 'You declined the trade',
      message: 'Your patches will not be traded',
      color: 'red'
    })

    navigate('/my-trades')
  }

  const onAccept = (): void => {
    notifications.show({
      title: 'You accepted the trade',
      message: 'Your patches will be traded',
      color: 'teal'
    })

    navigate('/my-trades')
  }

  return (
    <Container>
      <Stack>
        <Title order={1}>Trade details</Title>

        <Title order={4}>I give</Title>
        <PatchCard patch={mockOwnPatches[0]} />

        <Divider />

        <Title order={4}>I receive</Title>
        <PatchGrid patches={mockPatches.slice(0, 4)} />

        <Group grow>
          <Button
            color="red"
            variant="outline"
            radius="md"
            onClick={onDecline}>
              Decline
          </Button>

          <Button
            color="teal"
            radius="md"
            onClick={onAccept}>
              Accept
          </Button>
        </Group>
      </Stack>
    </Container>
  )
}

export default TradeDetailsScreen
