import { ReactElement, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Title, Image, Text, Card, Pill, Button, Group, UnstyledButton, Stack, TextInput } from '@mantine/core'
import { Patch } from '../types.ts'
import { mockPatches, mockOwnPatches, ownUser } from '../mock-data'
import { IconCircle2Filled, IconCircleCheckFilled, IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react'
import PatchSelectionList from '../components/PatchSelectionList.tsx'
import PatchList from '../components/PatchList.tsx'

const PatchDetailsScreen = (): ReactElement => {
  const { patchId } = useParams()
  const [isTradeMode, setIsTradeMode] = useState(false)
  const [isTradeOffered, setIsTradeOffered] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [patches, setPatches] = useState(mockOwnPatches)
  const [selectedPatches, setSelectedPatches] = useState(new Array<Patch>)
  useEffect((): void => {
    const lowerCaseSearchQuery: string = searchQuery.toLowerCase()

    setPatches(
      mockOwnPatches
        .filter((patch: Patch): boolean => patch.title.toLowerCase().includes(lowerCaseSearchQuery)))
  }, [searchQuery])
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

  function handlePatchSelection(checked: boolean, patch: Patch) {
    if(checked){
      setSelectedPatches([... selectedPatches, patch])
    }
    else {
      let newArray : Array<Patch> = [... selectedPatches]
      newArray = selectedPatches.filter(item => item.id !== patch.id)
      setSelectedPatches(newArray)
    }
  }

  function offerConfirmed(){
    setIsTradeOffered(true)
  }

  function cancelExchangeOffer(){
    setIsTradeOffered(false)
    setSelectedPatches(new Array<Patch>)
  }

  if(!isTradeMode && !isTradeOffered){
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
                {patch.categories.map((category, index) => <Pill key={index} size='lg' bg={colors[Math.floor(Math.random() * colors.length)]}>{category}</Pill>)}
              </Pill.Group>
            </Card>
            { patch.owner.mail !== ownUser.mail ?
              <Button fullWidth mt="lg" radius="md" onClick={() => setIsTradeMode(true)}>
                Make an offer
              </Button> :
              null
            }
          </Grid.Col>
        </Grid>
      </Container>
    )
  }
  else {
    return (
      <Container>
        <Title order={1}>Patch details</Title>
        <UnstyledButton w="100%" onClick={() => setIsTradeMode(false)}>
          <Card shadow="sm" my="md" padding="md" radius="md" withBorder>
            <Group>
              <IconCircleCheckFilled
                size={36}
              ></IconCircleCheckFilled>
              <Text fw={700} size="lg" lineClamp={1}>
                Patch Details
              </Text>
            </Group>
            <Group p="sm" my="sm" align="top" gap="xl">
              <Image
                src={patch.image}
                alt={patch.title}
                height={100}
                fallbackSrc="https://placehold.co/600x400?font=roboto&text=Placeholder"
                radius="md"
              ></Image>
              <Stack gap="xs" mt="md">
                <Title order={4}>
                  {patch.title}
                </Title>
                <Text fw={500} lineClamp={1}>
                  {'Listed by ' + patch.owner.name + ' ' + patch.owner.surname}
                </Text>
              </Stack>
            </Group>
          </Card>
        </UnstyledButton>
        { !isTradeOffered ?
          <Card shadow="sm" my="md" padding="md" radius="md" withBorder>
            <Grid gutter="xs" mb="md" p="sm" align="center">
              <Grid.Col span="auto">
                <Group>
                  <IconCircle2Filled
                    size={52}
                  ></IconCircle2Filled>
                  <Title order={3}>
                Exchange Offer
                  </Title>
                </Group>
              </Grid.Col>
              <Grid.Col span={1} mr="xl">
                <Button radius="md" disabled={selectedPatches.length === 0} onClick={offerConfirmed}>
                Confirm
                </Button>
              </Grid.Col>
            </Grid>
            <Grid gutter="xs" mb="md" p="sm" mx="md">
              <Grid.Col span="auto">
                <TextInput
                  leftSectionPointerEvents="none"
                  leftSection={<IconSearch size={16}/>}
                  placeholder="Search..."
                  radius="md"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.currentTarget.value)}
                />
              </Grid.Col>
              <Grid.Col span={1}>
                <Button variant="default" radius="md">
                  <IconAdjustmentsHorizontal size={24}></IconAdjustmentsHorizontal>
                </Button>
              </Grid.Col>
            </Grid>
            <Stack mb="xs" px="md" mx="xl">
              <PatchSelectionList patches={patches} selectedPatches={selectedPatches} handlePatchSelection={handlePatchSelection}></PatchSelectionList>
            </Stack>
          </Card> :
          <Card shadow="sm" my="md" padding="md" radius="md" withBorder>
            <Grid gutter="xs" mb="md" p="sm" align="center">
              <Grid.Col span="auto">
                <Group>
                  <IconCircleCheckFilled
                    size={36}
                  ></IconCircleCheckFilled>
                  <Text fw={700} size="lg" lineClamp={1}>
                    Exchange Offer
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={1} mr="xl">
                <Button radius="md" variant="outline" color="red" onClick={cancelExchangeOffer}>
                  Cancel
                </Button>
              </Grid.Col>
            </Grid>
            <Stack mb="xs" px="md" mx="xl">
              <Text fw={700} size="md" lineClamp={1}>
                Your Offer:
              </Text>
              <PatchList patches={selectedPatches}></PatchList>
            </Stack>
          </Card>
        }
      </Container>
    )
  }
}

export default PatchDetailsScreen
