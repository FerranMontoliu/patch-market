import { ReactElement } from 'react'
import { Accordion, Container, Text, Title } from '@mantine/core'

type Question = {
  question: string;
  answer: string;
}

const questions: Array<Question> = [
  {
    question: 'Can users rate each other on the platform to prevent undesirable behavior?',
    answer: 'Currently, this is not possible, but we are working on implementing a user rating system to ensure a safe trading environment and prevent no-shows or unwanted behavior.'
  },
  {
    question: 'Is it possible for users to create new tags for patch categories, as the default tags might be limiting?',
    answer: 'Yes. Users can create their own categories, providing more flexibility and better categorization of patch types.',
  },
  {
    question: 'How can I share a badge with a friend?',
    answer: 'Sharing badges with friends is possible through the share button in the details page of a patch.',
  },
  {
    question: 'What measures are in place to ensure that users complete a trade once it is accepted?',
    answer: 'Currently, we do not facilitate further measures for completing a trade. Users can see the Telegram username of the other person and contact each other.',
  },
  {
    question: 'Can a patch have multiple images?',
    answer: 'Currently, each patch can only have one image, but we are considering expanding this feature in the future.',
  },
  {
    question: 'How can traders communicate with each other after agreeing on a trade?',
    answer: 'Users will be able to see the Telegram user name of a person with whom they made a trade, and communicate via Telegram once a trade is agreed upon. We currently do not facilitate in-app messaging between traders.',
  },
  {
    question: 'Is it necessary to create a separate account, or can users use their university account for the platform?',
    answer: 'Yes, you will need to create a specific account for our platform. We do not support different login methods.',
  },
  {
    question: 'Is it possible to buy patches with money?',
    answer: 'No. Our platform focuses on trading patches, so it is not possible to purchase patches.',
  },
  {
    question: 'If you trade a patch with someone living in another country, how are the postal fees handled?',
    answer: 'Shipping costs for cross-border trades will vary, and it is up to the traders to negotiate and agree on how to handle these expenses.',
  },
  {
    question: 'If a user completes a trade, can they get a notification via email rather than visiting the website to check the status?',
    answer: 'In the current version, this is not happening, but we are planning to implement email notifications for trade status updates to keep users informed without needing to visit the website.',
  },
]

const FAQScreen = (): ReactElement => (
  <Container p={0}>
    <Title>
      Frequently Asked Questions
    </Title>

    <Accordion my="md">
      {questions.map(({ question, answer }, i: number) => (
        <Accordion.Item value={`${i}`} key={i}>
          <Accordion.Control p={0}>
            <Text fw={600}>{question}</Text>
          </Accordion.Control>

          <Accordion.Panel>
            <Text>{answer}</Text>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  </Container>
)


export default FAQScreen
