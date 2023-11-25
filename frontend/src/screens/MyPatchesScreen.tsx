import { ReactElement, useState } from 'react'
import { Button, Center, Container, Group, Loader, Stack, Text, TextInput, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { getOwnPatches } from '../services/patches'
import { IconSearch } from '@tabler/icons-react'
import PatchGrid from '../components/PatchGrid'
import { Patch } from '../types.ts'
import { NavLink } from 'react-router-dom'
import LogoutScreen from './LogoutScreen.tsx'

const MyPatchesScreen = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')

  const result = useQuery({
    queryKey: ['ownPatches'],
    queryFn: getOwnPatches,
  })

  if (result.isLoading) {
    return (
      <Center>
        <Loader/>
      </Center>
    )
  }

  if (result.isError) {
    return <LogoutScreen />
  }

  const patches : Array<Patch> = result.data

  const lowerCaseSearchQuery: string = searchQuery.toLowerCase()
  const filteredPatches: Array<Patch> = patches
    .filter((patch: Patch) => patch.title.toLowerCase().includes(lowerCaseSearchQuery))

  if (patches.length === 0) {
    return (
      <Container p={0}>
        <Stack>
          <Group>
            <Title order={1} mr="auto">My patches</Title>
            <Button
              variant="filled"
              component={NavLink} to="/add-patch"
              radius="md"
              miw="20%"
              mx="sm"
            >
                Add Patch
            </Button>
          </Group>
          <Center mt="lg">
            <Text fw={500} size="lg" lineClamp={1}>
            You do not have any patches yet. Add one!
            </Text>
          </Center>
        </Stack>
      </Container>
    )
  }

  return (
    <Container p={0}>
      <Stack>
        <Group>
          <Title order={1} mr="auto">My patches</Title>
          <Button
            variant="filled"
            component={NavLink} to="/add-patch"
            radius="md"
            miw="20%"
          >
                Add Patch
          </Button>
        </Group>

        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconSearch size={16}/>}
          placeholder="Search..."
          radius="md"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <PatchGrid patches={filteredPatches} />
      </Stack>
    </Container>
  )
}

export default MyPatchesScreen


