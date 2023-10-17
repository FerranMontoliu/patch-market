import { ReactElement, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Anchor, AppShell, Burger, Button, Group, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDiscount2 } from '@tabler/icons-react'
import AppRouter from './router/AppRouter'
import { useUser } from './contexts/UserContext.tsx'
import { User } from './types.ts'

type HeaderElement = {
  label: string
  link: string
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

  const [user, userDispatch] = useUser()
  const isLoggedIn: boolean = user !== null

  useEffect((): void => {
    const loggedUserJSON: string | null = window.localStorage.getItem('patchMarketUser')

    if (loggedUserJSON) {
      const user: User = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET_USER', payload: user })
    }
  }, [])

  const handleLogout = (): void => {
    window.localStorage.removeItem('patchMarketUser')
    userDispatch({ type: 'LOGOUT_USER' })
  }

  const logoutButton: ReactElement = (
    <Button
      key="log-out"
      variant="outline"
      color="red"
      mx="sm"
      onClick={handleLogout}
    >
        Log out
    </Button>
  )

  const headerElements: Array<ReactElement> =
      [
        ...headerLinks,
        logoutButton
      ]

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
              {isLoggedIn && headerElements}
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

export default App


//   {authContext.isLoggedIn ? (headerElements):(!headerElements)} option to not display the headers at all when not logged in