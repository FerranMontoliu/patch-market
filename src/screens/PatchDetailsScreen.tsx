import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Title, Image, Text, Card, Pill, Button } from '@mantine/core'
import { Patch } from '../types.ts'
import { mockPatches, mockOwnPatches } from '../mock-data'

const PatchDetailsScreen = (): ReactElement => {
  const { patchId } = useParams()
  const patchIdInt: number = patchId ? +patchId : -1
  const patchArray: Array<Patch> = [... mockPatches, ...mockOwnPatches]
  const patch: Patch = patchArray[patchIdInt-1]
  const colors: Array<string> = [
    '#FFA8A8',
    '#E599F7',
    '#B197FC',
    '#74C0FC',
    '#63E6BE',
    '#FFC078',
  ]

  return (
    <Container>
      <Title order={1}>Patch details</Title>
      <Grid my="xl" gutter="xl" p="sm" align="stretch">
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Image
            src={patch.image}
            alt={patch.title}
            height="100%"
            fallbackSrc="https://placehold.co/600x400?font=roboto&text=Placeholder"
            radius="md"
          ></Image>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
          <Title order={3}>
            {patch.title}
          </Title>
          <Text fw={500} lineClamp={1}>
            {'Listed by ' + patch.owner.name + ' ' + patch.owner.surname}
          </Text>
          <Card shadow="sm" my="md" padding="md" radius="md" withBorder>
            <Text fw={700} lineClamp={1}>
              About
            </Text>
            <Text>
              {patch.description}
            </Text>
            <Text fw={700} lineClamp={1} my="sm">
              Categories
            </Text>
            <Pill.Group>
              {patch.categories.map(category => <Pill key={0} size='lg' bg={colors[Math.floor(Math.random() * colors.length)]}>{category}</Pill>)}
            </Pill.Group>
          </Card>
          <Button fullWidth mt="lg" radius="md">
            Make an offer
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

export default PatchDetailsScreen
