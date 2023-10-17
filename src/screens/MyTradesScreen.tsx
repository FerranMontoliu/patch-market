import { ReactElement } from 'react'
import { Container, Title, Grid, Text } from '@mantine/core'
import { mockPatches } from '../mock-data.ts'
import HistoryElement from '../components/HistoryListElement.tsx'
const MyTradesScreen = (): ReactElement => {
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
      {mockPatches.map((patch, index) => (<HistoryElement key={index} patch={patch}></HistoryElement>))}
    </Container>
  )
}

export default MyTradesScreen
