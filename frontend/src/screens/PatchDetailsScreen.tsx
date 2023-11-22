import { ReactElement, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Center, Container, Grid, Group, Image, Loader, Pill, Stack, Text, TextInput, Title, UnstyledButton} from '@mantine/core'
import { Category, Patch } from '../types.ts'
import { notifications } from '@mantine/notifications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getOwnPatches, getPatchById, makePatchTradeable } from '../services/patches.ts'
import { useUserValue } from '../contexts/UserContext.tsx'
import { IconCircle2Filled, IconCircleCheckFilled, IconSearch, IconShare} from '@tabler/icons-react'
import PatchSelectionList from '../components/PatchSelectionList.tsx'
import PatchList from '../components/PatchList.tsx'
import { addTransaction, AddTransactionProps } from '../services/transactions.ts';
import LogoutScreen from './LogoutScreen.tsx'

const PatchDetailsScreen = (): ReactElement => {
  const { patchId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [isTradeMode, setIsTradeMode] = useState(false)
  const [isTradeOffered, setIsTradeOffered] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatches, setSelectedPatches] = useState(new Array<Patch>)

  const user = useUserValue()
  const ownUser = useUserValue()!

  const patchDetailsResult = useQuery({
    queryKey: ['patchById', patchId],
    queryFn: () => getPatchById(patchId!),
  })

  const ownPatchesResult = useQuery({
    queryKey: ['ownPatches'],
    queryFn: getOwnPatches,
  })

  const patch: Patch | null | undefined = patchDetailsResult.data
  const ownPatches: Array<Patch> | null | undefined = ownPatchesResult.data
  const lowerCaseSearchQuery: string = searchQuery.toLowerCase()
  const ownPatchesFiltered : Array<Patch> = ownPatches !== null && ownPatches !== undefined ? ownPatches.filter((patch: Patch) => patch.title.toLowerCase().includes(lowerCaseSearchQuery)) : []

  const makePatchTradeableMutation = useMutation({
    mutationFn: makePatchTradeable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patchById'] })
      queryClient.invalidateQueries({ queryKey: ['ownPatches'] })
      queryClient.invalidateQueries({ queryKey: ['tradeablePatches'] })
      queryClient.invalidateQueries({ queryKey: ['updateTransactionStatus'] })

      notifications.show({
        title: 'You listed this patch for trading!',
        message: 'Other users can now make offers for this patch.',
        color: 'teal'
      })
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red'
      })
      navigate('/my-patches')
    },
  })

  const categoryColorList: Array<string> = [
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

  const addTransactionMutation = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactionById'] })
      queryClient.invalidateQueries({ queryKey: ['tradeHistory'] })
      notifications.show({
        title: 'Offer Made',
        message: 'Your offer has been made successfully.',
        color: 'teal'
      })
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message, 
        color: 'red'
      })
      navigate('/my-patches')
    },
  })

  function makeOffer(){
    try {
    const transactionData: AddTransactionProps = {
      patchTo: patchId!, 
      patchesFrom: selectedPatches.map((selectedPatch) => selectedPatch.id), 
      from: ownUser.id,
      to: patch?.owner?.id || '', 
    }
      addTransactionMutation.mutate(transactionData)
      navigate('/my-trades') 
    }catch(error) {
    }
  }

  if (patchDetailsResult.isLoading) {
    return (
      <Center>
        <Loader/>
      </Center>
    )
  }

  if (patchDetailsResult.isError || !patch || !user) {
    return <LogoutScreen />
  }

  async function copyPageUrl() {
    try {
      await navigator.clipboard.writeText(location.href);
      notifications.show({
        title: 'The URL has been copied to your clipboard.',
        message: 'You can now share the Patch with your friends.',
        color: 'teal'
      })
    } catch (err) {
    }
  }
  
  const offsetValue = { base: 2, md: 3, lg: 3 };

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
          <Grid >
            <Grid.Col span={6}>
              <Title order={3}>
                {patch.title}
              </Title>
            </Grid.Col>
            <Grid.Col offset={offsetValue} span={{ base: 4, md: 3, lg: 3 }}>
              <Button fullWidth variant="filled" radius="md" onClick={copyPageUrl}>
                Share 
              <IconShare size={18} style={{ marginLeft: '5px' }} /></Button>
            </Grid.Col>
          </Grid>
          <Text fw={500} lineClamp={1}>
            {'Listed by ' + patch.owner.name + ' ' + patch.owner.surname}
          </Text>


            <Card shadow="sm" my="md" padding="md" radius="md" withBorder>
              <Text fw="bold">
                About
              </Text>

              <Text>
                {patch.description}
              </Text>

              <Text fw="bold" mt="sm">
                University
              </Text>

              <Text>
                {patch.university.name}
              </Text>

              <Text fw="bold" my="sm">
                Categories
              </Text>

              <Pill.Group>
                {patch.categories.map((category: Category, index:number) => (
                  <Pill key={index} size='lg' bg={categoryColorList[Math.floor(Math.random() * categoryColorList.length)]}>
                    {category.name}</Pill>
                ))}
              </Pill.Group>
            </Card>

            { patch.owner.id !== user.id && (
              <Button fullWidth mt="lg" radius="md" onClick={() => setIsTradeMode(true)}>
                Make an offer
              </Button>
            )}
            { (patch.owner.id === user.id && patch.tradeable === false) && (
              <Button fullWidth mt="lg" radius="md" onClick={() => makePatchTradeableMutation.mutate(patch)}>
                List for trading
              </Button>
            )}
            { (patch.owner.id === user.id && patch.tradeable === true) && (
              <Center><Text>You listed this patch for trading! </Text></Center>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    )
  }

  return (
    <Container>
      <Title order={1}>Patch details</Title>
      <UnstyledButton w="100%" onClick={() => setIsTradeMode(false)}>
        <Card shadow="sm" my="md" mx="xl" padding="md" radius="md" withBorder>
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
            />

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

      { !isTradeOffered
        ? (
          <Card shadow="sm" my="md" padding="md" radius="md" withBorder>
            <Grid gutter="xs" mb="md" p="sm" align="center">
              <Grid.Col span="auto">
                <Group>
                  <IconCircle2Filled size={52} />

                  <Title order={3}>
                    Exchange Offer
                  </Title>
                </Group>
              </Grid.Col>

              <Grid.Col span="content">
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
            </Grid>

            <Stack mb="xs" px="md" mx="xl">
              <PatchSelectionList
                patches={ownPatchesFiltered}
                selectedPatches={selectedPatches}
                handlePatchSelection={handlePatchSelection} />
            </Stack>
          </Card>
        ) : (
          <>
          <Card shadow="sm" my="md" mx="xl" padding="md" radius="md" withBorder>
            <Grid gutter="xs" mb="md" p="sm" align="center">
              <Grid.Col span="auto">
                <Group>
                  <IconCircleCheckFilled size={36} />
                  <Text fw="bold" size="lg" lineClamp={1}>
                    Exchange Offer
                  </Text>
                </Group>
              </Grid.Col>

              <Grid.Col span="content">
                <Button radius="md" variant="outline" color="red" onClick={cancelExchangeOffer}>
                  Cancel
                </Button>
              </Grid.Col>
            </Grid>

            <Stack mb="xs" px="md" mx="xl">
              <Text fw={700} size="md">
                Your Offer:
              </Text>

              <PatchList patches={selectedPatches} />
            </Stack>
          </Card>

          <Card shadow="sm" my="md" padding="md" radius="md" withBorder>
            <Button fullWidth mt="lg" radius="md" onClick={makeOffer}>
              Make Offer
            </Button>
          </Card>
          </>
          )
        }
    </Container>
  )
}

export default PatchDetailsScreen
