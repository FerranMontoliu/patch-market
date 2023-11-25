import { ReactElement } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Pill, Stack, Text, UnstyledButton } from '@mantine/core'
import { Transaction } from '../types.ts'
import { parseDate } from '../utils/date.ts'

const getStatusPill = (status: string): ReactElement => {
  switch (status) {
  case 'accepted':
    return <Pill size="lg" bg="green">Accepted</Pill>
  case 'rejected':
    return <Pill size="lg" bg="red">Declined</Pill>
  case 'cancelled':
    return <Pill size="lg" bg="orange">Cancelled</Pill>
  case 'pending':
    return <Pill size="lg" bg="blue">Pending</Pill>
  default:
    return <Pill size="lg" bg="gray">Unknown</Pill>
  }
}

type TradeHistoryListElementProps = {
  transaction: Transaction;
};

const TradeHistoryListElement = ({ transaction }: TradeHistoryListElementProps): ReactElement => {
  return (
    <Stack>
      <UnstyledButton component={RouterLink} to={`/trade-details/${transaction.id}`}>
        <Grid align='center' mt="lg">
          <Grid.Col span={4}>
            <Text fw={500} lineClamp={1}>
              {transaction.patchTo ? transaction.patchTo.title : 'Title not available'}
            </Text>
          </Grid.Col>

          <Grid.Col span={4}>
            <Text lineClamp={1}>
              {parseDate(new Date(transaction.createDate))}
            </Text>
          </Grid.Col>

          <Grid.Col span={4}>
            {getStatusPill(transaction.status)}
          </Grid.Col>
        </Grid>
      </UnstyledButton>
    </Stack>
  )
}

export default TradeHistoryListElement
