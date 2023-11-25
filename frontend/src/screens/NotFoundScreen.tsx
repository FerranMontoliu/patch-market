import { ReactElement } from 'react'
import { Anchor, Container, Stack, Title } from '@mantine/core'
import { Link as RouterLink } from 'react-router-dom'

const NotFoundScreen = (): ReactElement => (
  <Container p={0}>
    <Stack ta="center">
      <Title order={1} style={{ fontSize: '150px' }}>
                    404
      </Title>

      <Title order={4}>
                    You found a secret place
      </Title>

      <Anchor component={RouterLink} to="/" underline="always">Take me back to the home page</Anchor>
    </Stack>
  </Container>
)


export default NotFoundScreen
