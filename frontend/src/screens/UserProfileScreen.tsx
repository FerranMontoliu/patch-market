import { ReactElement, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserValue } from '../contexts/UserContext.tsx'
import { getOwnPatches } from '../services/patches.ts'
import { Button, Card, Center, Container, Grid, Group, Loader, TextInput, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { Link as RouterLink } from 'react-router-dom'
import { Patch } from '../types.ts'
import UserCard from '../components/UserCard.tsx'
import PatchList from '../components/PatchList.tsx'
import LogoutScreen from './LogoutScreen.tsx'
import NotFoundScreen from './NotFoundScreen.tsx'

const UserProfileScreen = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')

  const result = useQuery({
    queryKey: ['ownPatches'],
    queryFn: getOwnPatches,
  })

  const user = useUserValue()

  if (result.isLoading) {
    return (
      <Center>
        <Loader/>
      </Center>
    )
  }

  if (!user || !result.data) {
    return <NotFoundScreen />
  }

  if (result.isError) {
    return <LogoutScreen />
  }

  const patches: Array<Patch> = result.data

  const lowerCaseSearchQuery: string = searchQuery.toLowerCase()
  const ownPatchesFiltered: Array<Patch> = patches
    .filter((patch: Patch) => patch.title.toLowerCase().includes(lowerCaseSearchQuery))

  return (
    <Container p={0}>
      <Title order={1} mb="md">
        My profile
      </Title>

      <UserCard user={user} />

      <Card shadow="sm" mt="md" padding="md" radius="md" withBorder>
        <Group justify="space-between" align="center" mb="lg">
          <Title order={3}>My Collection</Title>

          <Button radius="md" component={RouterLink} to={'/add-patch'}>
            Add new patch
          </Button>
        </Group>

        <Grid gutter="xs" mb="md">
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

        <PatchList patches={ownPatchesFiltered} clickable={true}/>
      </Card>
    </Container>
  )
}

export default UserProfileScreen



