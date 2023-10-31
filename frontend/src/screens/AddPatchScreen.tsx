import { ReactElement } from 'react'
import { Card, Center, Container, Image, Pill, Text, TextInput, Title, Button } from '@mantine/core'
import { Patch } from '../types.ts'
import { mockOwnPatches, mockPatches } from '../mock-data'
import { Link as RouterLink } from 'react-router-dom'

const AddPatchScreen = (): ReactElement => {
  const patchCategories: Array<string> = [...new Set(
    [...mockPatches, ...mockOwnPatches]
      .reduce((acc: Array<string>, patch: Patch) => {
        return acc.concat(patch.categories)
      }, [])
  )]

  const colors: Array<string> = [
    '#FFA8A8',
    '#E599F7',
    '#B197FC',
    '#74C0FC',
    '#63E6BE',
    '#FFC078',
  ]

  return (
    <Container>
      <Title order={1}>Add a new patch</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Center>
          <Image
            src="https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png"
            radius="md"
            mah={400}
            maw={400}
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </Center>

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
          {patchCategories.map((category: string) => (
            <Pill
              key={category}
              size="lg"
              bg={colors[Math.floor(Math.random() * colors.length)]}
            >
              {category}
            </Pill>
          ))}
        </Pill.Group>

        {/*<FileInput*/}
        {/*  variant="filled"*/}
        {/*  placeholder="Add Patch"*/}
        {/*  onChange={(files) => {*/}
        {/*    // Handle the selected files here*/}
        {/*    console.log('Selected files:', files)*/}
        {/*  }}*/}
        {/*/>*/}
        <Button fullWidth mt="lg" radius="md" component={RouterLink} to={'/my-patches'}>
          Add patch
        </Button>
      </Card>
    </Container>
  )
}

export default AddPatchScreen
