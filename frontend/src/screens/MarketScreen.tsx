import { ReactElement, useState } from 'react'
import { Center, Container, Loader, Stack, TextInput, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import PatchGrid from '../components/PatchGrid.tsx'
import { Patch } from '../types.ts'
import { useQuery } from '@tanstack/react-query'
import { getTradeablePatches } from '../services/patches.ts'
import NotFoundScreen from './NotFoundScreen.tsx'

const MarketScreen = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const result = useQuery({
    queryKey: ['tradeablePatches'],
    queryFn: getTradeablePatches,
  })

  if (result.isLoading) {
    return (
      <Center>
        <Loader/>
      </Center>
    )
  }

  if (result.isError) {
    return <NotFoundScreen />
  }

  const patches: Array<Patch> = result.data

  const lowerCaseSearchQuery: string = searchQuery.toLowerCase()
  const filteredPatches: Array<Patch> = patches
    .filter((patch: Patch) => patch.title.toLowerCase().includes(lowerCaseSearchQuery))
  console.log(filteredPatches)
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
        <PatchGrid patches={filteredPatches}/>
      </Stack>
    </Container>
  )
}

export default MarketScreen
