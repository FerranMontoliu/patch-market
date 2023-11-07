import { ReactElement } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Text, UnstyledButton, Pill, Divider, Stack } from '@mantine/core'
import { Transaction, Patch } from '../types.ts';

type TransactionCardProps = {
  transaction: Transaction;
};

const getStatusPill = (status: string): ReactElement => {
  switch (status) {
    case 'accepted':
      return <Pill size="lg" bg="green">Accepted</Pill>;
    case 'declined':
      return <Pill size="lg" bg="red">Declined</Pill>;
    case 'cancelled':
      return <Pill size="lg" bg="orange">Cancelled</Pill>;
    case 'pending':
      return <Pill size="lg" bg="blue">Pending</Pill>;
    default:
      return <Pill size="lg" bg="gray">Unknown</Pill>; // I don't know how to return null
  }
};



const generateDate = (timestamp: Date): string => {
  if (!timestamp) {
    return "Date not available";
  }
  if (isNaN(timestamp.getTime())) {
    return "Invalid date";
  }
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return Intl.DateTimeFormat('en-us', options).format(timestamp);
};

const TransactionCard = ({ transaction }: TransactionCardProps): ReactElement => {
  console.log('Transaction createDate:', transaction.createDate);
  console.log('Transaction send to:', transaction.to);

  return (
    <Stack>
      <UnstyledButton component={RouterLink} to={`/trade-details/${transaction.id}`}>
        <Grid align='center' mt="lg" mx="xl">
          <Grid.Col span={4}>
            <Text fw={500} lineClamp={1}>
              {transaction.patchTo ? transaction.patchTo.title : 'Title not available'} 
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text lineClamp={1}>
            {generateDate(new Date(transaction.createDate))}
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
          {getStatusPill(transaction.status)}

          </Grid.Col>
        </Grid>
      </UnstyledButton>
      <Divider mx="xl"></Divider>
    </Stack>
  );
};

export default TransactionCard;

//  transaction.patchTo.title does not exist. only writing ' transaction.patchTo : 'Title not available'' gives an error. 