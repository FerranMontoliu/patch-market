import { ReactElement, useState } from 'react';
import {
  Text,
  Container,
  Title,
  Box,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth, AuthProvider } from '../contexts/AuthContext';
import { ownUser } from '../mock-data';
import { NavLink, useNavigate } from 'react-router-dom';

const LoginScreen = (): ReactElement => {
  const [view, setView] = useState('Log In');
  const authContext = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 1 ? 'Invalid password' : null),
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission
    const values = form.values;

    // Trigger form validation
    form.validate();
    console.log(values, 'triggered form validation');

    if (values.email === ownUser.mail) {
      console.log('Right user Data');
      authContext.setLogin(true); // Call the login function to update the isLoggedIn state
      console.log(authContext, 'we got logged!');
      navigate('/my-patches');
    } else {
      authContext.setLogin(false); // Call the login function to update the isLoggedIn state
      console.log(authContext.isLoggedIn, 'Navigation did not occur. Check your conditions.');
    }
  };

  return (
    <AuthProvider>
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

          <form onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps('email')}
              mt={30}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Your Password"
              {...form.getInputProps('password')}
              mt={10} // Add margin-top
            />

            <Button type="submit" fullWidth mt={15}>
              Log in
            </Button>
            <Text mt={15} size="sm">
              Don't have an account?{' '}
              <Anchor component={NavLink} to="/sign-up" key="home" underline="always">
                <b>Click here to create one</b>
              </Anchor>
            </Text>
          </form>
        </Box>
      </Container>
    </AuthProvider>
  );
};

export default LoginScreen;



// name: 'Rick',
//  surname: 'Sánchez',
//  telegramUser: 'rick_sanchez',
//  mail: 'rick@sanchez.com',
