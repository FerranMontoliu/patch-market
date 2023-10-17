import { ReactElement } from 'react'
import { Group, Card, Text, Title, Stack } from '@mantine/core'
import { User } from '../types'

type UserCardProps = {
  user: User;
};

const UserCard = ({ user }: UserCardProps): ReactElement => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Title order={3}>Personal Information</Title>

    <Stack gap="xs" mt="md">
      <Group>
        <Text fw="bold">
            Name:
        </Text>

        <Text lineClamp={1}>
          {user.name + ' ' + user.surname}
        </Text>
      </Group>

      <Group>
        <Text fw="bold" >
            Email:
        </Text>

        <Text lineClamp={1}>
          {user.mail}
        </Text>
      </Group>

      <Group mb="xs">
        <Text fw="bold" lineClamp={1}>
            Telegram user:
        </Text>

        <Text lineClamp={1}>
          @{user.telegramUser}
        </Text>
      </Group>
    </Stack>
  </Card>
)

export default UserCard
