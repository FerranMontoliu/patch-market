import { Anchor, AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDiscount2 } from '@tabler/icons-react'
import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

const headerElements: Array<ReactElement> = [
  'Home',
  'My patches',
  'My trades',
  'Profile',
  'Log out'
].map((title: string) => (
  <Anchor
    key={title}
    to="/"
    component={NavLink}
    underline="hover"
    p="sm"
  >
    {title}
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
        Body
      </AppShell.Main>
    </AppShell>
  )
}

export default App
