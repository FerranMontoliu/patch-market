import { ReactElement } from 'react'
// import { useParams } from 'react-router-dom'
import {Center, Loader, Button, Container, Divider, Group, Stack, Title } from '@mantine/core'
import PatchCard from '../components/PatchCard.tsx'
import PatchGrid from '../components/PatchGrid.tsx'

import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'

import { getOwnPatches } from '../services/patches.ts'
import { useQuery } from '@tanstack/react-query'
import { Patch } from '../types.ts'
import { getTradeablePatches } from '../services/patches.ts'
import NotFoundScreen from './NotFoundScreen.tsx'


const TradeDetailsScreen = (): ReactElement => {
  // const { tradeId } = useParams()
  const navigate = useNavigate()
  const ownPatchesResult = useQuery({
    queryKey: ['ownPatches'],
    queryFn: getOwnPatches,
  })

  const tradeablePatchesResult = useQuery({
    queryKey: ['tradeablePatches'],
    queryFn: getTradeablePatches,
  })

  if (ownPatchesResult.isLoading || tradeablePatchesResult.isLoading) {
    return (
      <Center>
        <Loader/>
      </Center>
    )
  }
  if (ownPatchesResult.isError || tradeablePatchesResult.isError) {
    return <NotFoundScreen />
  }
  const ownPatches: Array<Patch> = ownPatchesResult.data
  const tradeablePatches: Array<Patch> = tradeablePatchesResult.data

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
        {ownPatches.length > 0 && <PatchCard patch={ownPatches[0]} />}

        <Divider />

        <Title order={4}>I receive</Title>
        <PatchGrid patches={tradeablePatches.slice(0, 4)} />

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
