import { ReactElement, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Anchor, AppShell, Burger, Button, Group, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDiscount2 } from '@tabler/icons-react'
import AppRouter from './router/AppRouter'
import { useUser } from './contexts/UserContext.tsx'
import { User } from './types.ts'
import { setToken } from './services/config.ts'
import { logout } from './utils/logout.ts'

type HeaderElement = {
  label: string
  link: string
}

const getHeaderLinks = (onClick: () => void): Array<ReactElement> =>  [
  { label:'Home', link: '/' },
  { label:'My patches', link: '/my-patches' },
  { label:'My trades', link: '/my-trades' },
  { label:'Profile', link: '/user-profile' },
  { label:'FAQ', link: '/faq' },
].map((headerElement: HeaderElement) => (
  <Anchor
    key={headerElement.link}
    to={headerElement.link}
    component={NavLink}
    underline="hover"
    p="sm"
    onClick={onClick}
  >
    {headerElement.label}
  </Anchor>
))

function App(): ReactElement {
  const [opened, { toggle, close }] = useDisclosure()

  const [user, userDispatch] = useUser()
  const isLoggedIn: boolean = user !== null

  useEffect(() => {
    const loggedUserJSON: string | null = window.localStorage.getItem('patchMarketUser')

    if (loggedUserJSON) {
      const parsedUser: User = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET_USER', payload: parsedUser })
      if (parsedUser.token) {
        setToken(parsedUser.token)
      }
    } else {
      userDispatch({ type: 'LOGOUT_USER' })
    }
  }, [userDispatch])

  const handleLogout = (): void => {
    logout(userDispatch)
  }

  const handleMenuClick = (): void => {
    close()
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

  const headerLinks: Array<ReactElement> = getHeaderLinks(handleMenuClick)
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

          {isLoggedIn && <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {isLoggedIn && headerElements}
      </AppShell.Navbar>

      <AppShell.Main>
        <AppRouter />
      </AppShell.Main>
    </AppShell>
  )
}

export default App
