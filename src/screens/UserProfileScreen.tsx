import { ReactElement, useState, useEffect } from 'react'
import { Card, Group, Container, Title, Button, TextInput, Grid, Stack } from '@mantine/core'
import { useAuth } from '../contexts/AuthContext.tsx';
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react'
import { Link as RouterLink } from 'react-router-dom'
import { Patch } from '../types.ts'
import { ownUser } from '../mock-data.ts'
import { mockOwnPatches } from '../mock-data.ts'
import UserCard from '../components/UserCard.tsx'
import PatchList from '../components/PatchList.tsx'

const UserProfileScreen = (): ReactElement => {
  const authContext = useAuth();

  const [searchQuery, setSearchQuery] = useState('')
  const [patches, setPatches] = useState(mockOwnPatches)

  useEffect((): void => {
    const lowerCaseSearchQuery: string = searchQuery.toLowerCase()

    setPatches(
      mockOwnPatches
        .filter((patch: Patch): boolean => patch.title.toLowerCase().includes(lowerCaseSearchQuery)))
  }, [searchQuery])

  return (
    <Container>
      <Title order={1} mb="xl">My profile</Title>
      {authContext.isLoggedIn ? (
    <> 
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
          <Grid.Col span={1} mr="xs">
            <Button variant="default" radius="md">
              <IconAdjustmentsHorizontal size={24}></IconAdjustmentsHorizontal>
            </Button>
          </Grid.Col>
        </Grid>
        <Stack mb="xs" px="md">
          <PatchList patches={patches}></PatchList>
        </Stack>
      </Card>

     </>
    ) : (
      <p>You are not logged in. Please log in to view your Profile.</p>
    )}
    </Container>
  )
}

export default UserProfileScreen



