import { ReactElement } from 'react'
import {
  Container,
  Text,
  Title,
  Box,
  Button,
  Checkbox,
  Group,
  TextInput,
  PasswordInput,
  Anchor, Stack,
} from '@mantine/core'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { useNavigate, NavLink } from 'react-router-dom'
import { ownUser } from '../mock-data'
import { useUserDispatch } from '../contexts/UserContext.tsx'

type SignUpFormValues = {
  email: string
  name: string
  surname: string
  telegramUsername: string
  password: string
  passwordRepeat: string
  termsOfService: boolean
}

const initialFormValues: SignUpFormValues = {
  email: '',
  name: '',
  surname: '',
  telegramUsername: '',
  password: '',
  passwordRepeat: '',
  termsOfService: false,
}

const SignUpScreen = (): ReactElement => {
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: initialFormValues,
    validate: {
      name: isNotEmpty('Name is required'),
      surname: isNotEmpty('Surame is required'),
      telegramUsername: isNotEmpty('Used to contact other users'),
      email: isEmail('Invalid email or password'),
      password: isNotEmpty('Invalid password'),
      passwordRepeat: (value, values) => {
        if (value.length === 0) {
          return 'Invalid password'
        }

        if (value !== values.password) {
          return 'Passwords did not match'
        }

        return null
      },
      termsOfService: (value) => (!value ? 'Please accept our Terms and Conditions' : null),
    },
  })

  const handleFormSubmit = (values: SignUpFormValues): void => {
    if (values.email === ownUser.email) {
      window.localStorage.setItem('patchMarketUser', JSON.stringify(ownUser))
      userDispatch({ type: 'SET_USER', payload: ownUser })
      navigate('/')
    }
  }

  return (
    <Container>
      <Box maw={340} mx="auto">
        <Group>
          <Title order={2} style={{ textAlign: 'center', width: '100%' }}>
              Sign up to{' '}
          </Title>
          <Title order={1} style={{ textAlign: 'center', width: '100%' }}>
            <Text span c="blue" inherit>
                Patch Market
            </Text>
          </Title>
        </Group>

        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack mt="lg" gap="sm">
            <TextInput
              withAsterisk
              label="Name"
              placeholder="First name"
              {...form.getInputProps('name')}
            />

            <TextInput
              withAsterisk
              label="Surname"
              placeholder="Last name"
              {...form.getInputProps('surname')}
            />

            <TextInput
              withAsterisk
              label="E-mail"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your Password"
              {...form.getInputProps('password')}
            />

            <PasswordInput
              withAsterisk
              label="Repeat Password"
              placeholder="Your Password"
              {...form.getInputProps('passwordRepeat')}
            />

            <Checkbox
              label="I agree to the Terms and Conditions."
              {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />

            <Button type="submit" fullWidth>
              Sign up
            </Button>

            <Text mt="sm" size="sm">
              Already have an account?{' '}
              <Anchor component={NavLink} to="/log-in" key="home" underline="always">
                <b>Click here to log in</b>
              </Anchor>{' '}
            </Text>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}

export default SignUpScreen
