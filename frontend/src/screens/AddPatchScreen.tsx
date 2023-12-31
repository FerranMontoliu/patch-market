import { ReactElement, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { addPatch, AddPatchProps } from '../services/patches.ts'
import { notifications } from '@mantine/notifications'
import {
  Button,
  Card,
  Center,
  Container,
  FileInput,
  Image,
  Loader,
  Select, Stack,
  TagsInput,
  TextInput,
  Title
} from '@mantine/core'
import { Category, University } from '../types.ts'
import { isNotEmpty, useForm } from '@mantine/form'
import { getUniversities } from '../services/universities.ts'
import { IconBuilding, IconPhoto } from '@tabler/icons-react'
import { logout } from '../utils/logout.ts'
import { useUserDispatch } from '../contexts/UserContext.tsx'
import LogoutScreen from './LogoutScreen.tsx'
import { getCategories } from '../services/categories.ts'

const AddPatchScreen = (): ReactElement => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const userDispatch = useUserDispatch()

  const [imageTooBig, setImageTooBig] = useState(false)
  const [noImage, setNoImage] = useState(false)
  const [imageInput, setImageInput] = useState<File | null>(null)

  const getUniversitiesResult = useQuery({
    queryKey: ['universities'],
    queryFn: getUniversities
  })

  const getCategoriesResult = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      university: '',
      categories: new Array<string>(),
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
      logout(userDispatch)

      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red'
      })
      navigate('/my-patches')
    },
  })

  const getBase64 = async (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string' || reader.result instanceof ArrayBuffer) {
          resolve(reader.result)
        } else {
          reject(new Error('Failed to convert image to base64.'))
        }
      }
      reader.onerror = error => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const onAddPatch = async (): Promise<void> => {
    let base64Image: string = ' '
    try {
      const image = await getBase64(imageInput!)
      base64Image = image?.toString() ?? ' '
      const patch: AddPatchProps = {
        title: form.values.title,
        description: form.values.description,
        universityId: form.values.university,
        categoriesNames: form.values.categories.map((category: string) => category[0].toUpperCase() + category.slice(1, category.length).toLowerCase()),
        image: base64Image,
      }
      addPatchMutation.mutate(patch)

      navigate('/my-patches')
    } catch (error) {
      setNoImage(true)
    }
  }

  const checkFile = (file: File | null) => {
    setNoImage(false)

    if (!file || file.size > 1000000) {
      setImageTooBig(true)
      return false
    }

    setImageTooBig(false)
    return true
  }

  if (getUniversitiesResult.isLoading || getCategoriesResult.isLoading) {
    return (
      <Center>
        <Loader/>
      </Center>
    )
  }

  if (getUniversitiesResult.isError || getCategoriesResult.isError) {
    return <LogoutScreen/>
  }

  const universities: Array<University> = getUniversitiesResult.data
  const categories: Array<Category> = getCategoriesResult.data

  return (
    <Container p={0}>
      <Title order={1}>
        Add a new patch
      </Title>

      <Card shadow="sm" my="sm" radius="md" withBorder>
        <form onSubmit={form.onSubmit(onAddPatch)}>
          <Stack>
            {imageInput &&
                <Center>
                  <Image
                    src={URL.createObjectURL(imageInput)}
                    radius="md"
                    mah={300}
                    w="95%"
                    fit='contain'
                    fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                  />
                </Center>
            }

            <FileInput
              label="Patch Image"
              accept="image/png,image/jpeg"
              placeholder='Upload an image that shows the patch'
              withAsterisk
              leftSection={<IconPhoto size={16}/>}
              error={imageTooBig ? 'Image is too big, maximum size is 1MB' : noImage ? 'Image is required' : false}
              onChange={(file) => checkFile(file) ? setImageInput(file) : setImageInput(null)}
            />

            <TextInput
              withAsterisk
              label="Patch name"
              placeholder="Patch name"
              {...form.getInputProps('title')}
            />

            <TextInput
              label="Description"
              placeholder="Write the patch description here!"
              {...form.getInputProps('description')}
            />

            <Select
              placeholder="Select a university"
              label="University"
              withAsterisk
              leftSection={<IconBuilding size={16}/>}
              data={universities.map((university: University) => ({
                value: university.id,
                label: university.name
              }))}
              {...form.getInputProps('university')}
            />

            <TagsInput
              label="Categories"
              description="Insert a list of categories separated by spaces or commas to add them to the list"
              value={form.values.categories}
              onChange={(value: Array<string>) => form.setValues({ categories: value })}
              data={categories.map((category: Category) => category.name)}
              splitChars={[',', ' ']}
              placeholder="Add category"/>

            <Button type='submit' w="100%" radius="md" mt="sm">
              Add patch
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  )
}

export default AddPatchScreen
