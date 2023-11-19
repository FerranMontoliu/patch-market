import { ReactElement } from 'react'
import { Patch } from '../types'
import { Stack, Divider, Center, Text } from '@mantine/core'
import PatchListElement from './PatchListElement'

type PatchListProps = {
  patches: Array<Patch>
}

const PatchList = ({ patches }: PatchListProps): ReactElement => (
  patches.length !== 0 ?
    <Stack gap="xs">
      {patches.map((patch: Patch, i: number) => (
        <Stack key={patch.id} gap="xs">
          <PatchListElement patch={patch}/>

          { i < patches.length - 1
            ? <Divider my="xs"></Divider>
            : null
          }
        </Stack>
      ))}
    </Stack> :
    <Center><Text>You do not have any patches yet. Add one!</Text></Center>
)

export default PatchList
