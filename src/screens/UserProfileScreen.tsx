import { ReactElement, useEffect, useState } from 'react'
import { Button, Card, Container, Grid, Group, Stack, TextInput, Title } from '@mantine/core'
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons-react'
import { Link as RouterLink } from 'react-router-dom'
import { Patch } from '../types.ts'
import { mockOwnPatches, ownUser } from '../mock-data.ts'
import UserCard from '../components/UserCard.tsx'
import PatchList from '../components/PatchList.tsx'

const UserProfileScreen = (): ReactElement => {
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
    </Container>
  )
}

export default UserProfileScreen



