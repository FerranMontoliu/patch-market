import { ReactElement, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Anchor, AppShell, Burger, Button, Group, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDiscount2 } from '@tabler/icons-react'
import AppRouter from './router/AppRouter'
import {useAuth } from './contexts/AuthContext'






type HeaderElement = {
  label: string;
  link: string;
}

const headerLinks: Array<ReactElement> = [
  { label:'Home', link: '/' },
  { label:'My patches', link: '/my-patches' },
  { label:'My trades', link: '/my-trades' },
  { label:'Profile', link: '/user-profile' },
].map((headerElement: HeaderElement) => (
  <Anchor
    key={headerElement.link}
    to={headerElement.link}
    component={NavLink}
    underline="hover"
    p="sm"
  >
    {headerElement.label}
  </Anchor>
))



function App(): ReactElement {
  const [opened, { toggle }] = useDisclosure()
  const authContext = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    authContext.setLogin(false);  //Initialize

  };                            
  const loginButtonLabel = isLoggedIn ? 'Log Out' : 'Log In'; 

  useEffect(() => {
    setIsLoggedIn(authContext.isLoggedIn);
  }, [authContext.isLoggedIn]);

  const headerElements = [
    <Anchor component={NavLink} to="/" key="home" underline="never">
      <Group>
        <IconDiscount2 size={30} />
        <Title order={4}>PatchMarket</Title>
      </Group>
    </Anchor>,
    ...headerLinks,
    (
      <Button
        variant="outline"
        color={isLoggedIn ? 'red' : 'blue'}
        mx="sm"
        onClick={handleLogout}
        component={NavLink}
        to={isLoggedIn ? '/log-out' : '/log-in'} // Change the 'to' based on isLoggedIn
      >
        {loginButtonLabel}
      </Button>
    ),
  ];


  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Anchor component={NavLink} to="/" underline="never">
              <Group>
                <IconDiscount2 size={30} />
                <Title order={4}>PatchMarket</Title>
              </Group>
            </Anchor>
            <Group ml="xl" gap={0} visibleFrom="sm"> 
              {headerElements}
            </Group>
          </Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar py="md" px={4}>
          {headerElements}
        </AppShell.Navbar>
          <AppShell.Main>
        <AppRouter />
      </AppShell.Main>
    </AppShell>
  )
}

export default App;


//   {authContext.isLoggedIn ? (headerElements):(!headerElements)} option to not display the headers at all when not logged in 