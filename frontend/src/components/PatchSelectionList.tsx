import { ReactElement } from 'react'
import { Patch } from '../types'
import { Checkbox, Divider, Grid, Image, Pill, Stack, Text, Title, Center, Alert } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import PatchListElement from './PatchListElement'

type PatchListProps = {
  patches: Array<Patch>;
  selectedPatches: Array<Patch>;
  handlePatchSelection : (checked: boolean, patch: Patch) => void;
};

const PatchSelectionList = ({ patches, selectedPatches, handlePatchSelection }: PatchListProps): ReactElement => (
  patches.length !== 0 ? (
    <Stack gap="xs">
      <Title order={4}>
        Selected patches:
      </Title>
      {selectedPatches.length === 0 && <Alert icon={<IconInfoCircle></IconInfoCircle>} title='Select at least a patch to start trading.' color='blue'>You need to select at least a patch to send a trade offer.</Alert>}
      <Pill.Group mb="lg">
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
        <div
          key={patch.id}
          onClick={() => handlePatchSelection(!selectedPatches.includes(patch), patch)}
        >
          <Stack key={patch.id} gap="xs">
            <Grid align='center'>
              <Grid.Col span="auto">
                <PatchListElement patch={patch} clickable={false} />
              </Grid.Col>

              <Grid.Col span="content">
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
        </div>
      ))}
    </Stack>) : <Center><Text>You do not have any patches. Add some before trading!</Text></Center>
)

export default PatchSelectionList
