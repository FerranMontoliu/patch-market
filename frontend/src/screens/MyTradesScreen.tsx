import { ReactElement } from 'react'
import { Center, Container, Loader, Title, Grid, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import HistoryElement from '../components/HistoryListElement.tsx'
import { getTradeHistory } from '../services/transactions.ts'
import NotFoundScreen from './NotFoundScreen.tsx'
import { Transaction } from '../types'


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

  const transactions: Array<Transaction> = result.data

  return (
    <Container>
      <Title order={1}>
        My trades
      </Title>

      <Grid align='center' mt="xl">
        <Grid.Col span={4}>
          <Text fw="bold">
            Patch
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text fw="bold">
            Date
          </Text>
        </Grid.Col>

        <Grid.Col span={4}>
          <Text fw="bold">
            Status
          </Text>
        </Grid.Col>
      </Grid>
      
      {transactions.length === 0 ? (
        <Center mt="lg">
        <Text fw={500} size="lg" lineClamp={1}>
          You do not have any trades yet.
        </Text>
        </Center>
      ) : (
        transactions.map((transaction: Transaction, index: number) => (
          <HistoryElement key={index} transaction={transaction}  />
        ))
      )}
    </Container>
  )
}

export default MyTradesScreen