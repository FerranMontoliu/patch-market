import { ReactElement } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Card, Image, Stack, Text } from '@mantine/core'
import { Patch } from '../types.ts'

type PatchCardProps = {
  patch: Patch;
}

const PatchCard = ({ patch }: PatchCardProps): ReactElement => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={patch.image}
          height={160}
          alt={patch.title}
          fallbackSrc="https://placehold.co/600x400?font=roboto&text=Placeholder"
        />
      </Card.Section>

      <Text fw={500} mt="md" mb="xs" lineClamp={1}>
        {patch.title}
      </Text>
      <Stack h={40}>
        <Text size="sm" c="dimmed" lineClamp={2}>
          {patch.description}
        </Text>
      </Stack>
      <Button fullWidth mt="md" radius="md" component={RouterLink} to={`/patch-details/${patch.id}`}>
          See more details
      </Button>
    </Card>
  )
}

export default PatchCard
