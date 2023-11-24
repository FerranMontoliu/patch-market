import { ReactElement } from 'react'
import { Button, Space, Center, Container, Grid, Divider, Group, Loader, Stack, Text, Title, Alert } from '@mantine/core'
import { useUser } from '../contexts/UserContext.tsx'
import { notifications } from '@mantine/notifications'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Patch, Transaction } from '../types.ts'
import { getTransactionById, updateTransactionStatus } from '../services/transactions.ts'
import { logout } from '../utils/logout.ts'
import { IconAlertTriangleFilled } from '@tabler/icons-react'
import LogoutScreen from './LogoutScreen.tsx'
import PatchGridTransactionMultiple from '../components/PatchGridTransactionMultiple.tsx'
import PatchGridTransactionFirstColumn from '../components/PatchGridTransactionFirstColumn.tsx'

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
  const onAccept = async (): Promise<void> => {
    updateStatusMutation.mutate('accepted')
    notifications.show({
      title: 'You accepted the trade offer',
      message: 'Your patches will be traded',
      color: 'teal'
    })

  }

  const onCancel = (): void => {
    updateStatusMutation.mutate('cancelled')
    notifications.show({
      title: 'You cancelled the trade offer',
      message: 'Your patches will not be traded',
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
  if (tradeDetailsResult.isError|| !tradeDetailsResult.data || !ownUser) {
    return <LogoutScreen />
  }

  const transaction: Transaction = tradeDetailsResult.data
  const patchGiven: Patch[] = tradeDetailsResult.data
    ? [tradeDetailsResult.data.patchTo]
    : []
  const patchesReceived: Patch[] = tradeDetailsResult.data
    ? tradeDetailsResult.data.patchesFrom
    : []

  return (
    <Container>
      <Title order={1}>Trade details</Title>
      <Grid my="xl" gutter="xl" p="sm" align="stretch">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Title order={3}>
            {transaction.to && transaction.to.id === ownUser.id ? 'I give' : 'I receive'}
            <Space h="xs" />
          </Title>
          {patchGiven.length > 0 && <PatchGridTransactionFirstColumn patches={patchGiven} />}
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 9 }}>
          <Title order={3}>
            {transaction.to && transaction.to.id === ownUser.id ? 'I receive' : 'I give'}
            <Space h="xs" />
          </Title>
          {patchesReceived.length > 0 && <PatchGridTransactionMultiple patches={patchesReceived} />}
        </Grid.Col>
      </Grid>
      <Stack>
        {transaction.to && transaction.to.id === ownUser.id && transaction.status === 'pending' ? (
          <Stack>
            <Alert
              title = "You can only accept one trade offer for this patch!"
              icon = {<IconAlertTriangleFilled/>}
              color='red'
            >
              If you accept this trade offer, all the other offers for this patch will be declined.
            </Alert>
            <Group grow>
              <Button color="red" variant="outline" radius="md" onClick={onDecline}>
              Decline
              </Button>
              <Button color="teal" radius="md" onClick={onAccept}>
              Accept
              </Button>
            </Group>
          </Stack>
        ) : transaction.status === 'pending' ? (
          <Group grow>
            <Stack>
              <Divider />
              <Center my="lg">
                <Text fw={700}>After the offer is accepted, you will find the partner&aposs Telegram name displayed here.</Text>
              </Center>
              <Button color="red" radius="md" onClick={onCancel}>
              Cancel
              </Button>
            </Stack>
          </Group>
        ) : transaction.status === 'accepted' ? (
          <Center my="lg">
            <Stack align="center">
              {transaction.to && transaction.to.id === ownUser.id ? (
                <>
                  <Title order={4}>You accepted the trade offer!</Title>
                  <Text>
                  You can now reach out to your trading partner on Telegram using their username:{' '}
                    <span style={{ fontWeight: 'bold' }}>@{transaction.from?.telegramUser}</span>.
                  </Text>
                </>
              ) : (
                <>
                  <Title order={4}>Trade offer got accepted!</Title>
                  <Text>
                  You can now reach out to your trading partner on Telegram using their username:{' '}
                    <span style={{ fontWeight: 'bold' }}>@{transaction.to?.telegramUser}</span>.
                  </Text>
                </>
              )}
              <Text fw={700}>Happy trading!</Text>
            </Stack>
          </Center>
        ) : transaction.status === 'rejected' ? (
          <Center my="lg">
            <Text fw={700}>You declined this trade offer.</Text>
          </Center>
        ) : transaction.status === 'cancelled' ? (
          <Center my="lg">
            {transaction.to && transaction.to.id === ownUser.id ? (
              <Text fw={700}>Your trading partner cancelled this trade offer.</Text>
            ) : (
              <Text fw={700}>You canceled this trade offer.</Text>
            )}
          </Center>
        ) : null}
      </Stack>
    </Container>
  )
}

export default TradeDetailsScreen