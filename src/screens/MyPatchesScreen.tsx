import { ReactElement, useEffect, useState } from 'react'
import { Container, Stack, TextInput, Title } from '@mantine/core'
import { mockOwnPatches } from '../mock-data.ts'
import { IconSearch } from '@tabler/icons-react'
import PatchGrid from '../components/PatchGrid.tsx'
import { Patch } from '../types.ts'

const MyPatchesScreen = (): ReactElement => {
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
        <Title order={1}>My patches</Title>
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconSearch size={16}/>}
          placeholder="Search..."
          radius="md"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <PatchGrid patches={patches}/>
      </Stack>
    </Container>
  )
}

export default MyPatchesScreen
