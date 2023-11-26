import { ReactElement } from 'react'
import { Anchor, Container, Group, Title } from '@mantine/core'
import { IconDiscount2 } from '@tabler/icons-react'
import { NavLink } from 'react-router-dom'

const AppFooter = (): ReactElement => {
  return(
    <Container p="md" bg="gray.0">
      <Anchor component={NavLink} to="/" underline="never">
        <Group>
          <IconDiscount2 size={30}/>
          <Title order={4}>PatchMarket</Title>
        </Group>
      </Anchor>
    </Container>
  )
}

export default AppFooter