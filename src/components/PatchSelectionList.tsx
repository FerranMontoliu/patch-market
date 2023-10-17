import { ReactElement } from 'react'
import { Patch } from '../types'
import { Stack, Divider, Title, Pill, Group , Image, Text, Checkbox, Grid } from '@mantine/core'
import PatchListElement from './PatchListElement'

type PatchListProps = {
  patches: Array<Patch>;
  selectedPatches: Array<Patch>;
  handlePatchSelection : (checked: boolean, patch: Patch) => void;
};

const PatchSelectionList = ({ patches, selectedPatches, handlePatchSelection }: PatchListProps): ReactElement => (
  <Stack gap="xs">
    <Title order={4}>
        Selected patches:
    </Title>
    <Pill.Group mb="xl">
      {selectedPatches.map((patch, index) => <Pill key={index} size='lg' withRemoveButton onRemove={() => handlePatchSelection(false , patch)}>
        <Group>
          <Image
            src={patch.image}
            height={20}
            alt={patch.title}
            fallbackSrc="https://placehold.co/600x400?font=roboto&text=Placeholder"
            radius="sm"
          />
          <Text size="sm" lineClamp={1}>
            {patch.title}
          </Text>
        </Group>
      </Pill>)}
    </Pill.Group>
    {patches.map((patch) => (
      <Stack key={patch.id} gap="xs">
        <Grid align='center'>
          <Grid.Col span="auto">
            <PatchListElement patch={patch}/>
          </Grid.Col>
          <Grid.Col  span={1}>
            <Checkbox c='dark' checked={selectedPatches.includes(patch)} onChange={(event) => handlePatchSelection(event.currentTarget.checked, patch)}></Checkbox>
          </Grid.Col>
        </Grid>
        {patches[patches.length - 1] !== patch ? (
          <Divider size="xs" my="xs"></Divider>
        ) : null}
      </Stack>
    ))}
  </Stack>
)

export default PatchSelectionList
