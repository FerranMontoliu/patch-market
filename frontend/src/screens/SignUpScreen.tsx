import { ReactElement } from 'react'
import { Container, Text, Title, Box, Button, Checkbox, Group, TextInput, PasswordInput, Anchor, Stack } from '@mantine/core'
import { isEmail, isNotEmpty, useForm } from '@mantine/form'
import { useNavigate, NavLink } from 'react-router-dom'
import { useUserDispatch } from '../contexts/UserContext.tsx'
import { login } from '../services/login.ts'
import { notifications } from '@mantine/notifications'
import { signUp } from '../services/signup.ts'
import { User } from '../types.ts'


type SignUpFormValues = {
  email: string;
  name: string;
  surname: string;
  telegramUser: string;
  password: string;
  passwordRepeat: string;
};

const initialFormValues: SignUpFormValues = {
  email: '',
  name: '',
  surname: '',
  telegramUser: '',
  password: '',
  passwordRepeat: '',
};

const SignUpScreen = (): ReactElement => {
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()
  const form = useForm({
    initialValues: initialFormValues,
    validate: {
      name: isNotEmpty('Name is required'),
      surname: isNotEmpty('Surname is required'),
      telegramUser: isNotEmpty('Used to contact other users'),
      email: isEmail('Invalid email or password'),
      password: isNotEmpty('Invalid password'),
      passwordRepeat: (value, values) => {
        if (value.length === 0) {
          return 'Invalid password'
        }
        if (value !== values.password) {
          return 'Passwords did not match'
        }
        return null;
      },
    },
  });

  const handleFormSubmit = async (values: SignUpFormValues): Promise<void> => {
    try {
      const response = await signUp(values) as { data: User }
      const user = response.data
      window.localStorage.setItem('patchMarketUser', JSON.stringify(user))
      userDispatch({ type: 'SET_USER', payload: user })
      navigate('/')
        await login({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      notifications.show({
        title: 'Error signing up',
        message: 'There was an error creating your account. Please try again later.',
        color: 'red',
      })
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
          <TextInput withAsterisk label="Name" placeholder="First name" {...form.getInputProps('name')} />
            <TextInput withAsterisk label="Surname" placeholder="Last name" {...form.getInputProps('surname')} />
            <TextInput
              withAsterisk
              label="Telegram Username"
              placeholder="Your Telegram Username"
              {...form.getInputProps('telegramUser')}
            />
            <TextInput withAsterisk label="E-mail" placeholder="your@email.com" {...form.getInputProps('email')} />

            <PasswordInput withAsterisk label="Password" placeholder="Your Password" {...form.getInputProps('password')} />

            <PasswordInput
              withAsterisk
              label="Repeat Password"
              placeholder="Your Password"
              {...form.getInputProps('passwordRepeat')}
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
  );
};

export default SignUpScreen;