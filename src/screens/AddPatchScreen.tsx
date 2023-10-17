import { ReactElement } from 'react';
import { Container, FileInput, Card } from '@mantine/core';
import { useAuth } from '../contexts/AuthContext.tsx';
import {
  Text,
  Title,
  Box,
  Image,
  Button,
  TextInput,
  Pill,
} from '@mantine/core';
import { Patch } from '../types.ts';
import { mockPatches, mockOwnPatches } from '../mock-data';
import { useParams } from 'react-router-dom';

const AddPatchScreen = (): ReactElement => {
  const authContext = useAuth();
  const { patchId } = useParams();
  const patchIdInt: number = patchId ? +patchId : -1;
  const patchArray: Array<Patch> = [...mockPatches, ...mockOwnPatches];
  const patch: Patch = patchArray[patchIdInt - 1];
  const colors: Array<string> = [
    '#FFA8A8',
    '#E599F7',
    '#B197FC',
    '#74C0FC',
    '#63E6BE',
    '#FFC078',
  ];

  return (
    <Container>
      {authContext.isLoggedIn ? (
        <>
          <Title order={1}>Add a new patch</Title>
          <Card shadow="sm" padding="lg" radius="md" withBorder>

          <center>
            
            <Image
              src="https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png"
              radius="md"
              h={400}
              w="auto"
              fit="contain"
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
          </center>

            <TextInput
              withAsterisk
              label="Patch name"
              placeholder="Patch name"
              mt={30}
            />
            <TextInput
              withAsterisk
              label="Description"
              placeholder="This patch is very..."
              mt={10}
            />

            <Text fw={700} lineClamp={1} my="sm">
              Categories
            </Text>
            <Pill.Group>
              {patch &&
                patch.categories.map((category, index) => (
                  <Pill
                    key={index}
                    size="lg"
                    bg={colors[Math.floor(Math.random() * colors.length)]}
                  >
                    {category}
                  </Pill>
                ))}
            </Pill.Group>

            <FileInput
              variant="filled"
              placeholder="Add Patch"
              onChange={(files) => {
                // Handle the selected files here
                console.log('Selected files:', files);
              }}
            />
          </Card>
        </>
      ) : (
        <p>You are not logged in. Please log in to view your trades.</p>
      )}
    </Container>
  );
};

export default AddPatchScreen;
