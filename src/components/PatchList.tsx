import { ReactElement } from 'react'
import { Patch } from '../types'
import { Stack, Divider } from '@mantine/core'
import PatchListElement from './PatchListElement'

type PatchListProps = {
  patches: Array<Patch>
}

const PatchList = ({ patches }: PatchListProps): ReactElement => (
  <Stack gap="xs">
    {patches.map((patch: Patch, i: number) => (
      <Stack key={patch.id} gap="xs">
        <PatchListElement patch={patch}/>

        { i < patches.length
          ? <Divider my="xs"></Divider>
          : null
        }
      </Stack>
    ))}
  </Stack>
)

export default PatchList
