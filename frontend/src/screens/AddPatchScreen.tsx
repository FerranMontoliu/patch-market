import { ReactElement } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AddPatchProps, addPatch } from '../services/patches.ts'
import { notifications } from '@mantine/notifications'
import { Card, Center, Container, Image, Pill, Text, TextInput, Title, Button, Loader, NativeSelect } from '@mantine/core'
import { Patch } from '../types.ts'
import { mockOwnPatches, mockPatches } from '../mock-data'
import { isNotEmpty, useForm } from '@mantine/form'
import { getUniversities } from '../services/universities.ts'
import NotFoundScreen from './NotFoundScreen.tsx'
import { University } from '../types.ts'
import { IconBuilding } from '@tabler/icons-react'

const AddPatchScreen = (): ReactElement => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const getUniversitiesResult = useQuery({
    queryKey: ['universities'],
    queryFn: getUniversities
  })

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      university: '',
      categories: [],
      image: '',
    },
    validate: {
      title: isNotEmpty('Title is required'),
      university: isNotEmpty('University is required'),
    }
  })

  const patchCategories: Array<string> = [...new Set(
    [...mockPatches, ...mockOwnPatches]
      .reduce((acc: Array<string>, patch: Patch) => {
        return acc.concat(patch.categories)
      }, [])
  )]

  const addPatchMutation = useMutation({
    mutationFn: addPatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ownPatches'] })
      notifications.show({
        title: 'You added a new patch',
        message: 'The new patch was added successfully',
        color: 'teal'
      })
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message, 
        color: 'red'
      })
      navigate('/my-patches')
    },
  })

  const onAddPatch = (): void => {
    const patch : AddPatchProps = {
      title : form.values.title,
      description : form.values.description,
      universityId : form.values.university,
      categoriesNames : ["65413a4d028970eb913c97eb"],
      image : " ",
    }
    addPatchMutation.mutate(patch)

    navigate('/my-patches')
  }

  const colors: Array<string> = [
    '#FFA8A8',
    '#E599F7',
    '#B197FC',
    '#74C0FC',
    '#63E6BE',
    '#FFC078',
  ]

  if (getUniversitiesResult.isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }
  if (getUniversitiesResult.isError || !getUniversitiesResult.data || getUniversitiesResult.data.length === 0) {
    return <NotFoundScreen />
  }

  const universities: Array<University> = getUniversitiesResult.data

  return (
    <Container>
      <Title order={1}>Add a new patch</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form onSubmit={form.onSubmit(onAddPatch)}>
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
          {...form.getInputProps('title')}
        />

        <TextInput
          label="Description"
          placeholder="Write the patch description here!"
          mt={10}
          {...form.getInputProps('description')}
        />

        <NativeSelect
          label="University"
          withAsterisk
          leftSection={<IconBuilding size={16}/>}
          data={universities.map((university: University) => ({ value: university.id, label: university.name }))}
          mt={10}
          {...form.getInputProps('university')}
        ></NativeSelect>

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
        <Center>
          <Button type='submit' w="40%" mt="xl" radius="md">
            Add patch
          </Button>
        </Center>
        </form>
      </Card>
    </Container>
  )
}

export default AddPatchScreen
