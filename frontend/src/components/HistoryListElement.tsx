import { ReactElement } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Text, UnstyledButton, Pill, Divider, Stack } from '@mantine/core'
import { Patch } from '../types.ts'

type PatchCardProps = {
  patch: Patch;
};

const Accepted = () : ReactElement => {
  return (
    <Pill size="lg" bg="green" >
        Accepted
    </Pill>
  )
}

const Declined = () : ReactElement => {
  return (
    <Pill size="lg" bg="red" >
        Declined
    </Pill>
  )
}

const Cancelled = () : ReactElement => {
  return (
    <Pill size="lg" bg="orange" >
        Cancelled
    </Pill>
  )
}

const Pending = () : ReactElement => {
  return (
    <Pill size="lg" bg="blue" >
        Pending
    </Pill>
  )
}

const RandomStatus = () : ReactElement => {
  const random : number = Math.floor(Math.random() * 4)
  switch(random){
  case 0:
    return (<Accepted></Accepted>)
  case 1:
    return (<Cancelled></Cancelled>)
  case 2:
    return (<Declined></Declined>)
  case 3:
    return (<Pending></Pending>)
  default:
    return (<Accepted></Accepted>)
  }
}



function generateDate() : string{
  const options : Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  const month : number = Math.floor(Math.random() * 11) + 1
  const day : number = Math.floor(Math.random() * 27) + 1
  return Intl.DateTimeFormat('en-us', options).format(new Date(2023, month, day))
}

const PatchListElement = ({ patch }: PatchCardProps): ReactElement => {
  return (
    <Stack>
      <UnstyledButton component={RouterLink} to={'/trade-details/:tradeId/'}>
        <Grid align='center' mt="lg" mx="xl">
          <Grid.Col span={4}>
            <Text fw={500} lineClamp={1}>
              {patch.title}
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text lineClamp={1}>
              {generateDate()}
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <RandomStatus></RandomStatus>
          </Grid.Col>
        </Grid>
      </UnstyledButton>
      <Divider mx="xl"></Divider>
    </Stack>
  )
}

export default PatchListElement
