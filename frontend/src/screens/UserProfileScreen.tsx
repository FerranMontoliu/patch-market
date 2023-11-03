import { ReactElement, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserValue } from '../contexts/UserContext.tsx'
import { getOwnPatches } from '../services/patches.ts'
import { Button, Card, Container, Grid, Group, Stack, TextInput, Title } from '@mantine/core'
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react'
import { Link as RouterLink } from 'react-router-dom'
import { Patch } from '../types.ts'
import UserCard from '../components/UserCard.tsx'
import PatchList from '../components/PatchList.tsx'
import NotFoundScreen from './NotFoundScreen.tsx'

const UserProfileScreen = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')

  const result = useQuery({
    queryKey: ['ownPatches'],
    queryFn: getOwnPatches,
  })

  console.log(result.data)

  const ownUser = useUserValue()!

  const patches : Array<Patch> | null | undefined = result.data
  const lowerCaseSearchQuery: string = searchQuery.toLowerCase()
  const ownPatchesFiltered : Array<Patch> = patches !== null && patches !== undefined ? patches.filter((patch: Patch) => patch.title.toLowerCase().includes(lowerCaseSearchQuery)) : []

  if(ownUser === undefined || ownUser === null || patches === undefined || patches === null) {
    <NotFoundScreen></NotFoundScreen>
  }


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
          <PatchList patches={ownPatchesFiltered}></PatchList>
        </Stack>
      </Card>
    </Container>
  )
}

export default UserProfileScreen



