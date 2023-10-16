import { ReactElement } from 'react'
import { User } from '../types'
import { Group, Card, Text, Title } from '@mantine/core'

type UserProps = {
  user: User;
};

const UserCard = ({ user }: UserProps): ReactElement => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Title order={3}>Personal Information</Title>
    <Group>
      <Text fw={700} mt="xl" lineClamp={1}>
        Name:
      </Text>
      <Text mt="xl" lineClamp={1}>
        {user.name + ' ' + user.surname}
      </Text>
    </Group>
    <Group>
      <Text fw={700} mt="xs" lineClamp={1}>
        Email:
      </Text>
      <Text mt="xs" lineClamp={1}>
        {user.mail}
      </Text>
    </Group>
    <Group mb="xs">
      <Text fw={700} mt="xs" lineClamp={1}>
        Telegram:
      </Text>
      <Text mt="xs" lineClamp={1}>
        {user.telegramUser}
      </Text>
    </Group>
  </Card>
)

export default UserCard
