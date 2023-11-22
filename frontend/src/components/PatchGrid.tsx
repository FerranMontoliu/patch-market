import { ReactElement } from 'react'
import { Patch } from '../types'
import { Grid } from '@mantine/core'
import PatchCard from './PatchCard.tsx'

type PatchGridProps = {
  patches: Array<Patch>;
}

const PatchGrid = ({ patches }: PatchGridProps): ReactElement => (
  <Grid>
    {patches.map((patch) => (
      <Grid.Col key={patch.id} span={{ base: 12, md: 6, lg: 3 }}>
        <PatchCard patch={patch} />
      </Grid.Col>
    ))}
  </Grid>
)

export default PatchGrid