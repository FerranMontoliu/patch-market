import { ReactElement, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserValue } from '../contexts/UserContext.tsx'
import { getOwnPatches } from '../services/patches.ts'
import { Button, Card, Center, Container, Grid, Group, Loader, Stack, TextInput, Title } from '@mantine/core'
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react'
import { Link as RouterLink } from 'react-router-dom'
import { Patch } from '../types.ts'
import UserCard from '../components/UserCard.tsx'
import PatchList from '../components/PatchList.tsx'
import LogoutScreen from './LogoutScreen.tsx'

const UserProfileScreen = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')

  const result = useQuery({
    queryKey: ['ownPatches'],
    queryFn: getOwnPatches,
  })

  const ownUser = useUserValue()

  if (result.isLoading) {
    return (
      <Center>
        <Loader/>
      </Center>
    )
  }

  if (result.isError || !ownUser || !result.data) {
    return <LogoutScreen />
  }

  const patches: Array<Patch> = result.data

  const lowerCaseSearchQuery: string = searchQuery.toLowerCase()
  const ownPatchesFiltered: Array<Patch> = patches
    .filter((patch: Patch) => patch.title.toLowerCase().includes(lowerCaseSearchQuery))

  return (
    <Container>
      <Title order={1} mb="xl">My profile</Title>

      <UserCard user={ownUser}></UserCard>

      <Card mt="lg" shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" align="center" mb="lg">
          <Title order={3}>My Collection</Title>

          <Button radius="md" component={RouterLink} to={'/add-patch'}>
            Add new patch
          </Button>
        </Group>

        <Grid gutter="xs" mb="md" p="sm">
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

          <Grid.Col span="content">
            <Button variant="default" radius="md">
              <IconAdjustmentsHorizontal size={24} />
            </Button>
          </Grid.Col>
        </Grid>

        <Stack mb="xs" px="md">
          <PatchList patches={ownPatchesFiltered} />
        </Stack>
      </Card>
    </Container>
  )
}

export default UserProfileScreen



