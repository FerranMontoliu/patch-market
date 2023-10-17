import { ReactElement } from 'react'
import { Patch } from '../types'
import { Checkbox, Divider, Grid, Image, Pill, Stack, Text, Title } from '@mantine/core'
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
      {selectedPatches.map((patch: Patch) => (
        <Pill
          maw={200}
          miw={200}
          w={200}
          bg="dark"
          key={patch.id}
          size="xl"
          withRemoveButton
          styles={{
            label: {
              display: 'flex',
              alignItems: 'center',
            },
            remove: {
              marginLeft: 'auto',
              color: 'white',
            },
          }}
          onRemove={() => handlePatchSelection(false, patch)}
        >
          <Grid gutter="md">
            <Grid.Col span={2}>
              <Image
                w={20}
                h={20}
                src={patch.image}
                alt={patch.title}
                fallbackSrc="https://placehold.co/600x400?font=roboto&text=Placeholder"
                radius="sm"
              />
            </Grid.Col>

            <Grid.Col span={10}>
              <Text size="sm" c="white" truncate="end" style={{ wordBreak: 'break-all' }}>
                {patch.title}
              </Text>
            </Grid.Col>
          </Grid>
        </Pill>
      ))}
    </Pill.Group>

    {patches.map((patch: Patch) => (
      <Stack key={patch.id} gap="xs">
        <Grid align='center'>
          <Grid.Col span="auto">
            <PatchListElement patch={patch} />
          </Grid.Col>
          <Grid.Col  span={1}>
            <Checkbox
              c='dark'
              checked={selectedPatches.includes(patch)}
              onChange={(event) => handlePatchSelection(event.currentTarget.checked, patch)} />
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
