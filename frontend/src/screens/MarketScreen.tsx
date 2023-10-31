import { ReactElement, useEffect, useState } from 'react'
import { Container, Stack, TextInput, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import PatchGrid from '../components/PatchGrid.tsx'
import { mockPatches } from '../mock-data.ts'
import { Patch } from '../types.ts'

const MarketScreen = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')
  const [patches, setPatches] = useState(mockPatches)

  useEffect((): void => {
    const lowerCaseSearchQuery: string = searchQuery.toLowerCase()

    setPatches(
      mockPatches
        .filter((patch: Patch): boolean => patch.title.toLowerCase().includes(lowerCaseSearchQuery)))
  }, [searchQuery])

  return (
    <Container>
      <Stack>
        <Title order={1}>Trade patches</Title>
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

export default MarketScreen
