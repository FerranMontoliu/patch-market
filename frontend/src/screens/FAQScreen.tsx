import { ReactElement } from 'react';
import { Container, Accordion, Title, Space } from '@mantine/core';


const FAQScreen = (): ReactElement => (
  <Container size="md">
     <Space h="lg" />
    <Title ta="center">Frequently Asked Questions</Title>
    <Space h="lg" />
    <Space h="lg" />
    <Space h="lg" />
    <Accordion variant="separated" radius="md" transitionDuration={500}   >
      <Accordion.Item value="rating" style={{ border: '1px solid grey' }}>
        <Accordion.Control >
          Can users rate each other on the platform to prevent undesirable behavior?
        </Accordion.Control>
        <Accordion.Panel>
          Currently, this is not possible, but we're working on implementing a user rating system to ensure a safe trading environment and prevent no-shows or unwanted behavior.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item style={{ border: '1px solid grey' }} value="newtags">
        <Accordion.Control  >
          Is it possible for users to create new tags for patch categories, as the default tags might be limiting?
        </Accordion.Control>
        <Accordion.Panel>
          We are planning to allow users to create their own tags, providing more flexibility and better categorization of patch types.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item style={{ border: '1px solid grey' }} value="share">
        <Accordion.Control>
          How can I share a badge with a friend?
        </Accordion.Control>
        <Accordion.Panel>
          Sharing badges with friends is possible through the share button in the details of your patches.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item style={{ border: '1px solid grey' }} value="checktrade">
        <Accordion.Control>
          What measures are in place to ensure that users complete a trade once it's accepted?
        </Accordion.Control>
        <Accordion.Panel>
          Currently, we do not facilitate further measures for completing a trade. Users can see each other's Telegram name and contact each other.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item style={{ border: '1px solid grey' }} value="images">
        <Accordion.Control>
          Can a patch have multiple images?
        </Accordion.Control>
        <Accordion.Panel>
          Currently, each patch can only have one image, but we're considering expanding this feature in the future.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item style={{ border: '1px solid grey' }} value="telegram">
        <Accordion.Control>
          How can traders communicate with each other after agreeing on a trade?
        </Accordion.Control>
        <Accordion.Panel>
          Users will be able to see each other's Telegram accounts and communicate via Telegram once a trade is agreed upon. We currently do not facilitate in-app messaging between traders.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item style={{ border: '1px solid grey' }} value="signup">
        <Accordion.Control>
          Is it necessary to create a separate account, or can users use their university account for the platform?
        </Accordion.Control>
        <Accordion.Panel>
          You will need to create a specific account for our platform; we don't currently support different login methods.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item style={{ border: '1px solid grey' }} value="patch-purchases">
        <Accordion.Control>
          Is it possible to buy patches with money?
        </Accordion.Control>
        <Accordion.Panel>
          Our platform primarily focuses on trading, and it is currently not possible to purchase patches.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item style={{ border: '1px solid grey' }} value="postal-fees">
        <Accordion.Control>
          If you trade a patch with someone living in another country, how are the postal fees handled?
        </Accordion.Control>
        <Accordion.Panel>
          Shipping costs for cross-border trades will vary, and it's up to the traders to negotiate and agree on how to handle these expenses.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item style={{ border: '1px solid grey' }} value="email-notifications">
        <Accordion.Control>
          If a user completes a trade, can they get a notification via email rather than visiting the website to check the status?
        </Accordion.Control>
        <Accordion.Panel>
          In the current version, this is not happening, but we are planning to implement email notifications for trade status updates to keep users informed without needing to visit the website.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </Container>
);


export default FAQScreen;
