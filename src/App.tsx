import { Anchor, AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDiscount2 } from '@tabler/icons-react'
import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import AppRouter from './router/AppRouter.tsx'

type HeaderElement = {
  label: string;
  link: string;
}

const headerElements: Array<ReactElement> = [
  { label:'Home', link: '/' },
  { label:'My patches', link: '/my-patches' },
  { label:'My trades', link: '/my-trades' },
  { label:'Profile', link: '/user-profile' },
  { label:'Log out', link: '/log-out' },
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

function App() {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <IconDiscount2 size={30} />
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

export default App
