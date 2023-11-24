import { ReactElement } from 'react'
import { Alert, Button, Center, Container, Grid, Group, Loader, Space, Stack, Title } from '@mantine/core'
import { useUser } from '../contexts/UserContext.tsx'
import { notifications } from '@mantine/notifications'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Patch, Transaction } from '../types.ts'
import { getTransactionById, updateTransactionStatus } from '../services/transactions.ts'
import { logout } from '../utils/logout.ts'
import { IconAlertTriangleFilled, IconInfoCircle } from '@tabler/icons-react'
import LogoutScreen from './LogoutScreen.tsx'
import PatchGridTransactionMultiple from '../components/PatchGridTransactionMultiple.tsx'
import PatchGridTransactionFirstColumn from '../components/PatchGridTransactionFirstColumn.tsx'
import NotFoundScreen from './NotFoundScreen.tsx'

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

  if (!tradeDetailsResult.data || !ownUser) {
    return <NotFoundScreen />
  }

  if (tradeDetailsResult.isError) {
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
              <Alert
                title={`You sent this trade offer to ${transaction.to?.name + ' ' + transaction.to?.surname}`}
                icon = {<IconInfoCircle/>}
                color='blue'
                my='md'
              >
                If your trading partner accepts this trade offer, you will be able to see their Telegram username and contact them.
              </Alert>
              <Center>
                <Button w='50%' color="red" radius="md" onClick={onCancel}>
                  Cancel
                </Button>
              </Center>
            </Stack>
          </Group>
        ) : transaction.status === 'accepted' ? (
          <Stack>
            {transaction.to && transaction.to.id === ownUser.id ? (
              <Alert
                title="You accepted the trade offer!"
                icon = {<IconInfoCircle/>}
                color='teal'
                my='md'
              >
                    You can now reach out to your trading partner on Telegram using their username:{' '}
                <span style={{ fontWeight: 'bold' }}>@{transaction.from?.telegramUser}. Happy Trading!</span>
              </Alert>
            ) : (
              <Alert
                title={`${transaction.to?.name + ' ' + transaction.to?.surname} accepted this trade offer!`}
                icon = {<IconInfoCircle/>}
                color='teal'
                my='md'
              >
                    You can now reach out to your trading partner on Telegram using their username:{' '}
                <span style={{ fontWeight: 'bold' }}>@{transaction.to?.telegramUser}. Happy Trading!</span>
              </Alert>
            )}
          </Stack>
        ) : transaction.status === 'rejected' ? (
          <Alert
            title="This trade offer was declined."
            icon = {<IconAlertTriangleFilled/>}
            color='red'
            my='md'
          >
            No worries. You will have other chances to trade your patches.
          </Alert>
        ) : transaction.status === 'cancelled' ? (
          <Stack>
            {transaction.to && transaction.to.id === ownUser.id ? (
              <Alert
                title="Your trade partner changed their mind."
                icon = {<IconAlertTriangleFilled/>}
                color='red'
                my='md'
              >
              No worries. You will have other chances to trade your patches.
              </Alert>
            ) : (
              <Alert
                title="Your cancelled this trade offer."
                icon = {<IconAlertTriangleFilled/>}
                color='red'
                my='md'
              >
              No worries. You can always send another one!
              </Alert>
            )}
          </Stack>
        ) : null}
      </Stack>
    </Container>
  )
}

export default TradeDetailsScreen