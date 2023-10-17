import { ReactElement, useEffect, useState } from 'react'
import { Container, Stack, TextInput, Title, Button, Group} from '@mantine/core'
import { mockOwnPatches } from '../mock-data.ts'
import { IconSearch } from '@tabler/icons-react'
import PatchGrid from '../components/PatchGrid'
import { Patch } from '../types.ts'
import { useAuth } from '../contexts/AuthContext';
import {NavLink } from 'react-router-dom'


const MyPatchesScreen = (): ReactElement => {
  const authContext = useAuth();
  const [searchQuery, setSearchQuery] = useState('')
  const [patches, setPatches] = useState(mockOwnPatches)


  useEffect((): void => {
    const lowerCaseSearchQuery: string = searchQuery.toLowerCase()

    setPatches(
      mockOwnPatches
        .filter((patch:Patch): boolean => patch.title.toLowerCase().includes(lowerCaseSearchQuery)))
  }, [searchQuery])

  return (
    <Container>
      <Stack>
        <Group>
        <Title order={1}>My patches</Title>
        {authContext.isLoggedIn && (
          <>
            <Group gap="lg">
              <Button 
                variant="filled"
                component={NavLink} to="/add-patch"
                color='black'
                mx="sm"
              >
                Add Patch
              </Button>
            </Group>
          </>
        )}
        </Group>

        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconSearch size={16}/>}
          placeholder="Search..."
          radius="md"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        {authContext.isLoggedIn ? (
          <>
           












          <PatchGrid patches={patches} /> 
          </>
             
        ) : (
          <p>You are not logged in. Please log in to view your patches.</p>
        )}
      </Stack>
    </Container>
  )
}

export default MyPatchesScreen


