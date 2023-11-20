import { ReactElement } from 'react'
import { Button, Center, Container, Divider, Group, Loader, Stack, Text, Title } from '@mantine/core'
import PatchCard from '../components/PatchCard.tsx'
import { useUser } from '../contexts/UserContext.tsx'
import { notifications } from '@mantine/notifications'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Patch, Transaction } from '../types.ts' // Import your types
import { getTransactionById, updateTransactionStatus } from '../services/transactions.ts'
import { logout } from '../utils/logout.ts'
import LogoutScreen from './LogoutScreen.tsx'

const TradeDetailsScreen = (): ReactElement => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { tradeId } = useParams()

  const [ownUser, userDispatch] = useUser()

  const tradeDetailsResult = useQuery({
    queryKey: ['transactionById', tradeId],
    queryFn: () => getTransactionById(tradeId!)
  })

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: string) => updateTransactionStatus(tradeId!, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactionById'] })
      queryClient.invalidateQueries({ queryKey: ['tradeHistory'] })
    },
    onError: (error: Error) => {
      logout(userDispatch)

      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red'
      })
    },
  })

  const onDecline = (): void => {
    updateStatusMutation.mutate('rejected')
    notifications.show({
      title: 'You declined the trade offer',
      message: 'Your patches will not be traded',
      color: 'red'
    })

    navigate('/my-trades')
  }

  const onAccept = (): void => {
    updateStatusMutation.mutate('accepted')
    notifications.show({
      title: 'You accepted the trade offer',
      message: 'Your patches will be traded',
      color: 'teal'
    })

    navigate('/my-trades')
  }

  const onCancel = (): void => {
    updateStatusMutation.mutate('cancelled')
    notifications.show({
      title: 'You cancelled the trade offer',
      message: 'Your patches will not be traded',
      color: 'red'
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
  if (tradeDetailsResult.isError|| !tradeDetailsResult.data || !ownUser) {
    return <LogoutScreen />
  }

  const transaction: Transaction = tradeDetailsResult.data

  const patchGiven: Patch = transaction.patchTo
  const patchesReceived: Array<Patch> = transaction.patchesFrom

  return (
    <Container>
      <Stack>
        <Title order={1}>Trade details</Title>
        <Title order={4}>I give</Title>
        <PatchCard patch={patchGiven} />

        <Divider />
        <Title order={4}>I receive</Title>

        {patchesReceived.length > 0 &&
          patchesReceived.map((patch, index) => (
            <PatchCard key={index} patch={patch} />
          ))}

        {transaction.to.id === ownUser.id && transaction.status === 'pending' ?
          (<Group grow>
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
          </Group>) : transaction.status === 'pending' ?
            <Group grow>
              <Button color="red" radius="md" onClick={onCancel}>
              Cancel
              </Button>
            </Group>
            : transaction.status === 'accepted' ?
              <Center my="lg"><Text>You accepted this trade offer.</Text></Center>
              : transaction.status === 'rejected' ?
                <Center my="lg"><Text>You declined this trade offer.</Text></Center>
                : transaction.status === 'cancelled' ?
                  <Center my="lg"><Text>You canceled this trade offer.</Text></Center>
                  : null
        }
      </Stack>
    </Container>
  )
}

export default TradeDetailsScreen