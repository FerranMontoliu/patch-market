import { ReactElement, useState } from 'react'
import { Center, Container, Loader, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import PatchGrid from '../components/PatchGrid.tsx'
import { Patch } from '../types.ts'
import { useQuery } from '@tanstack/react-query'
import { getTradeablePatches } from '../services/patches.ts'

const MarketScreen = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  // const [patches, setPatches] = useState<Array<Patch>>([])

  const result = useQuery({
    queryKey: ['tradeablePatches'],
    queryFn: getTradeablePatches,
  })

  // useEffect((): void => {
  //   const lowerCaseSearchQuery: string = searchQuery.toLowerCase()
  //
  //   setPatches(
  //     initialPatches
  //       .filter((patch: Patch): boolean => patch.title.toLowerCase().includes(lowerCaseSearchQuery)))
  // }, [searchQuery])

  if (result.isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  if (result.isError) {
    return <Text>There was an error fetching the patches</Text>
  }

  const patches: Array<Patch> = result.data

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
