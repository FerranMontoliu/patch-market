import { ReactElement } from 'react'
import {
  Center,
  Loader,
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Title
} from '@mantine/core'
import PatchCard from '../components/PatchCard.tsx'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Patch } from '../types.ts' // Import your types
import NotFoundScreen from './NotFoundScreen.tsx'
import { useParams } from 'react-router-dom'
import { getTransactionById } from '../services/transactions.ts'

const TradeDetailsScreen = (): ReactElement => {
  const navigate = useNavigate()
  const { tradeId } = useParams()
  const tradeDetailsResult = useQuery({
    queryKey: ['transactionById', tradeId],
    queryFn: () => getTransactionById(tradeId!)
  })

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

  if (tradeDetailsResult.isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }
  if (tradeDetailsResult.isError) {
    return <NotFoundScreen />
  }

  const patchGiven: Patch[] = tradeDetailsResult.data
    ? [tradeDetailsResult.data.patchTo]
    : []
  const patchReceived: Patch[] = tradeDetailsResult.data
    ? tradeDetailsResult.data.patchesFrom
    : []

  return (
    <Container>
      <Stack>
        <Title order={1}>Trade details</Title>
        <Title order={4}>I give</Title>
        <PatchCard patch={patchGiven[0]} />

        <Divider />
        <Title order={4}>I receive</Title>
        {patchReceived.length > 0 && <PatchCard patch={patchReceived[0]} />}

        <Group grow>
          <Button
            color="red"
            variant="outline"
            radius="md"
            onClick={onDecline}
          >
            Decline
          </Button>
          <Button color="teal" radius="md" onClick={onAccept}>
            Accept
          </Button>
        </Group>
      </Stack>
    </Container>
  )
}

export default TradeDetailsScreen

