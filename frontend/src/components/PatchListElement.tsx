import { ReactElement } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Group, Image, Text, UnstyledButton } from '@mantine/core'
import { Patch } from '../types.ts'

type PatchListElementProps = {
  patch: Patch
  clickable: boolean
}

const PatchListElement = ({ patch, clickable }: PatchListElementProps): ReactElement => {
  return (
    <UnstyledButton
      component={RouterLink}
      to={clickable ? `/patch-details/${patch.id}` : ''}>
      <Group>
        <Image
          src={patch.image}
          height={50}
          miw={70}
          maw={70}
          alt={patch.title}
          fallbackSrc="https://placehold.co/600x400?font=roboto&text=Placeholder"
          radius="md"
        />

        <Text fw={500} lineClamp={1}>
          {patch.title}
        </Text>
      </Group>
    </UnstyledButton>
  )
}

export default PatchListElement
