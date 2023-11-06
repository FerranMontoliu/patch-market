import { ReactElement } from 'react'
import { Center, Container, Loader, Title, Grid, Text } from '@mantine/core'
import { Patch } from '../types.ts'

import { useQuery } from '@tanstack/react-query'
import HistoryElement from '../components/HistoryListElement.tsx'
import {getTradeHistory} from '../services/patches'
import NotFoundScreen from './NotFoundScreen.tsx'

const MyTradesScreen = (): ReactElement => {

  const result = useQuery({
    queryKey: ['gettradeHistory'],
    queryFn: getTradeHistory,
  })

  if (result.isLoading) {
    return (
      <Center>
        <Loader/>
      </Center>
    )
  }
  
  if (result.isError) {
    return <NotFoundScreen />
  }
  
  const patches: Array<Patch> = result.data

  return (
    <Container>
      <Title order={1}>My trades</Title>
      <Grid align='center' mt="xl" mx="xl">
        <Grid.Col span={4}>
          <Text fw={700} lineClamp={1}>
            Patch
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text fw={700} lineClamp={1}>
            Date
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Text fw={700} lineClamp={1}>
            Status
          </Text>
        </Grid.Col>
      </Grid>
      {patches.map((patch, index) => (<HistoryElement key={index} patch={patch} />))}
    </Container>
  )
}

export default MyTradesScreen
