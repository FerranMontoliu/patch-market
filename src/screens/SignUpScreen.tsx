import { ReactElement } from 'react';
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
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth, AuthProvider } from '../contexts/AuthContext';
import { ownUser } from '../mock-data';


const SignUpScreen = (): ReactElement => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
      password1: '',
      telegram_username: '',
      password2: '',
      firstName: '',
      lastName: '',
    },
    validate: {
      firstName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      lastName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      telegram_username: (value) => (value.length < 1 ? 'Used to contact other users' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email or password'),
      password1: (value) => (value.length < 1 ? 'Invalid password' : null),
      password2: (value) => (value.length < 1 ? 'Invalid password' : null),
      termsOfService: (value) => (!value ? 'Please accept our Terms and Conditions' : null),
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const values = form.values;
    form.validate();
    console.log(values, 'current values: triggered form validation');
    if (values.email === ownUser.mail) { // CHECK PASSWORD WITH TOKEN LATER (values.password === values.password) {
      console.log('Right user Data');
      authContext.setLogin(true);  // Call the login function to update the isLoggedIn state
      console.log(authContext, 'we got logged!');
      navigate('/my-patches');
    }

    console.log('Right user Data');
    authContext.setLogin(true);
    console.log(authContext, 'we got logged!');
    navigate('/');
  };

  return (
    <AuthProvider>
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

          <form onSubmit={handleSubmit}>
            <TextInput 
              withAsterisk 
              label="Name" 
              placeholder="First name" 
              {...form.getInputProps('firstName')} />
            <TextInput
              withAsterisk
              label="Surname"
              placeholder="Last name"
              mt="md"
              {...form.getInputProps('lastName')}
            />
            <TextInput 
              withAsterisk 
              label="E-mail" 
              placeholder="your@email.com" 
              {...form.getInputProps('email')} mt={15} />
            <PasswordInput 
              withAsterisk 
              label="Password" 
              placeholder="Your Password" 
              mt={15} 
              {...form.getInputProps('password1')} />
            <PasswordInput 
              withAsterisk 
              label="Repeat Password" 
              placeholder="Your Password" 
              mt={15} 
              {...form.getInputProps('password2')} />
            <Checkbox
              mt="md"
              label="I agree to the Terms and Conditions*"
              {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />
            <Button type="submit" fullWidth mt={15}>
              Sign up
            </Button>
            <Text mt={15} size="sm">
              Already have an account?{' '}
              <Anchor component={NavLink} to="/log-in" key="home" underline="always">
                <b>Click here to log in</b>
              </Anchor>{' '}
            </Text>
          </form>
        </Box>
      </Container>
    </AuthProvider>
  );
};

export default SignUpScreen;


// name: 'Rick',
//  surname: 'Sánchez',
//  telegramUser: 'rick_sanchez',
//  mail: 'rick@sanchez.com',
