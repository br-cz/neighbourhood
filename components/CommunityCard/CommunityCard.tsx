import React from 'react';
import {
  Avatar,
  Text,
  Group,
  Badge,
  Card,
  Stack,
  SimpleGrid,
  Button,
  Space,
  Flex,
  Grid,
  rem,
} from '@mantine/core';

interface CommunityCardProps {
  name: string;
  image: string;
  members: any[];
  friends: any[];
}

export default function CommunityCard({ name, image, members, friends }: CommunityCardProps) {
  return (
    <Stack align="center">
      <Card shadow="md" padding="md" radius="md" withBorder w="50vw">
        <Grid align="flex-end">
          <Grid.Col span={3}>
            <Avatar src={image} size="10vw" />
          </Grid.Col>
          <Grid.Col span={4} style={{ minHeight: rem(130) }}>
            <Text size="xl" fw={600}>
              {name}
            </Text>
            <Text c="dimmed" size="md">
              Members: {members.length}
            </Text>
            <Text c="dimmed" size="md">
              Friends: {friends.length}
            </Text>
          </Grid.Col>
          <Grid.Col span={5}>
            <Flex gap="md" direction="row" justify="end">
              <Button size="sm" variant="filled">
                Select
              </Button>
              <Button size="sm" variant="filled">
                Leave
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>
    </Stack>
  );
}

{
  /* <Card shadow="sm" padding="sm" radius="md" withBorder w="35vw">
      <Avatar src={image} size="100" />
      {/* <Flex justify="center" gap="xs" direction="column" align="center"> }
      <Text size="lg" fw={600}>
        {name}
      </Text>
      <Text c="dimmed" size="md">
        Members: {members.length}
      </Text>
      <Text c="dimmed" size="md">
        Friends: {friends.length}
      </Text>
      {/* </Flex> }
      <Flex justify="flex-end" gap="xl">
        <Button size="md" variant="filled">
          Select
        </Button>
        <Button size="md" variant="filled">
          Leave
        </Button>
      </Flex>
    </Card> */
}

{
  /* <Card shadow="md" padding="xs" radius="md" withBorder w="55vw">
<Grid align="center">
  <Grid.Col span={3}>
    <Avatar src={image} size="130" />
  </Grid.Col>
  {/* <Flex justify="center" gap="xs" direction="column" align="center"> }
  <Grid.Col span={5}>
    {/* <Flex justify="center"> }
    <Text size="xl" fw={600}>
      {name}
    </Text>
    <Text c="dimmed" size="md">
      Members: {members.length}
    </Text>
    <Text c="dimmed" size="md">
      Friends: {friends.length}
    </Text>
    {/* </Flex> }
  </Grid.Col>
  {/* </Flex> }
  <Grid.Col span={4}>
    <Flex gap="xl" direction="row" justify="flex-end">
      <Button size="sm" variant="filled">
        Select
      </Button>
      <Button size="sm" variant="filled">
        Leave
      </Button>
    </Flex>
  </Grid.Col>
</Grid>
</Card> */
}
