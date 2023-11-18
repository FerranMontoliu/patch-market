import { ReactElement, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { redirect, useNavigate } from 'react-router-dom'
import { AddPatchProps, addPatch } from '../services/patches.ts'
import { notifications } from '@mantine/notifications'
import { Card, Center, Container, Image, TextInput, Title, Button, Loader, NativeSelect, FileInput, PillsInput, TagsInput } from '@mantine/core'
import { University } from '../types.ts'
import { isNotEmpty, useForm } from '@mantine/form'
import { getUniversities } from '../services/universities.ts'
import NotFoundScreen from './NotFoundScreen.tsx'
import { IconBuilding, IconPhoto } from '@tabler/icons-react'

const AddPatchScreen = (): ReactElement => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [imageTooBig, setImageTooBig] = useState(false)

  const getUniversitiesResult = useQuery({
    queryKey: ['universities'],
    queryFn: getUniversities
  })

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      university: '',
      categories: new Array<string>(),
      image: new File([], ''),
    },
    validate: {
      title: isNotEmpty('Title is required'),
      university: isNotEmpty('University is required'),
    }
  })

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

  const getBase64 = async (file: File) : Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string' || reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64.'));
        }
      }
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const onAddPatch = async (): Promise<void> => {
    let base64Image : string = ' ';
    try {
      const image = await getBase64(form.values.image)
      base64Image = image?.toString() ?? ' '
    }catch(error) {
      notifications.show({
        title: 'Error',
        message: (error as Error).message, 
        color: 'red'
      })
      navigate('/my-patches')
    }
    const patch : AddPatchProps = {
      title : form.values.title,
      description : form.values.description,
      universityId : form.values.university,
      categoriesNames : form.values.categories.map((category: string) => category[0].toUpperCase() + category.slice(1, category.length).toLowerCase()),
      image : base64Image,
    }
    addPatchMutation.mutate(patch)

    navigate('/my-patches')
  }

  const checkFile = (file: File) => {
    if(file.size > 1000000)
    {
      setImageTooBig(true)
      return false
    }
    setImageTooBig(false)
    return true
  }

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
  if(form.values.university === '')
  {
    form.setValues({
      university: universities[0].id
    })
  }

  return (
    <Container>
      <Title order={1}>Add a new patch</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <form onSubmit={form.onSubmit(onAddPatch)}>
        <Center>
          <Image
            src={form.values.image ? URL.createObjectURL(form.values.image) : "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_1280.png"}
            radius="md"
            h={200}
            w="auto"
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          />
        </Center>

        <FileInput
            label="Patch Image"
            accept="image/png,image/jpeg"
            placeholder='Upload an image that shows the patch'
            withAsterisk
            leftSection={<IconPhoto size={16}/>}
            mt={30}
            error={imageTooBig ? 'Image is too big, maximum size is 1MB' : false}
            onChange={(file) => form.values.image = checkFile(file) ? file : new File([], '')}
        ></FileInput>

        <TextInput
          withAsterisk
          label="Patch name"
          placeholder="Patch name"
          mt={10}
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

        <TagsInput 
          variant='unstyled'
          label="Categories" 
          value={form.values.categories}
          onChange={(value) => form.setValues({ categories: value })}
          mt={10}
          placeholder="Add category" />
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
