import { ReactElement } from 'react'
import { Patch } from '../types'
import { Stack, Divider } from '@mantine/core'
import PatchListElement from './PatchListElement'

type PatchGridProps = {
  patches: Array<Patch>;
};

const PatchList = ({ patches }: PatchGridProps): ReactElement => (
  <Stack gap="xs">
    {patches.map((patch) => (
      <Stack key={patch.id} gap="xs">
        <PatchListElement patch={patch}/>
        {patches[patches.length - 1] !== patch ? (
          <Divider size="xs" my="xs"></Divider>
        ) : null}
      </Stack>
    ))}
  </Stack>
)

export default PatchList
