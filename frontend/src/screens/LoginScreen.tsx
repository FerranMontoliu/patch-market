import { ReactElement } from 'react'
import { Anchor, Box, Button, Container, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useUserDispatch } from '../contexts/UserContext.tsx'
import { login } from '../services/login.ts'
import { notifications } from '@mantine/notifications'

type LoginFormValues = {
  email: string;
  password: string;
}

const initialFormValues: LoginFormValues = {
  email: '',
  password: '',
}

const LoginScreen = (): ReactElement => {
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    initialValues: initialFormValues,
    validate: {
      email: isEmail('Invalid email'),
      password: isNotEmpty('Invalid password'),
    },
  })

  const handleFormSubmit = (values: LoginFormValues): void => {
    login({
      email: values.email,
      password: values.password,
    })
      .then((user) => {
        window.localStorage.setItem('patchMarketUser', JSON.stringify(user))
        userDispatch({ type: 'SET_USER', payload: user })
        navigate('/')
      })
      .catch(() => {
        notifications.show({
          title: 'Error logging in',
          message: 'Check that your username and password are correct or try again later',
          color: 'red'
        })
      })
  }

  return (
    <Container>
      <Box maw={340} mx="auto" mt={60}>
        <Group>
          <Title order={2} style={{ textAlign: 'center', width: '100%' }}>
              Welcome to
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
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your Password"
              {...form.getInputProps('password')}
            />

            <Button type="submit" fullWidth>
              Log in
            </Button>

            <Text mt="sm" size="sm">
              Don&apos;t have an account?{' '}
              <Anchor component={RouterLink} to="/sign-up" underline="always">
                <b>Click here to create one</b>
              </Anchor>
            </Text>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}

export default LoginScreen
