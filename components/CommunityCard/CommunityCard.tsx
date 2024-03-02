import React from 'react';
import { Avatar, Text, Card, Stack, Button, Flex, Grid } from '@mantine/core';

interface CommunityCardProps {
  name: string;
  image: string;
  members: any[];
  friends: any[];
}

export default function CommunityCard({ name, image, members, friends }: CommunityCardProps) {
  return (
    <Stack align="center">
      <Card shadow="md" withBorder w="27vw">
        <Grid align="stretch">
          <Grid.Col span={2}>
            <Avatar src={image} size="3.5vw" mt="xl" mb="xl" />
          </Grid.Col>
          <Grid.Col span={5}>
            <Flex direction="column" justify="center" style={{ height: '100%' }}>
              <Text size="xl" fw={600}>
                {name}
              </Text>
              <Text c="dimmed" size="md">
                Members: {members.length}
              </Text>
              <Text c="dimmed" size="md">
                Friends: {friends.length}
              </Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={5}>
            <Flex
              gap="xl"
              direction="row"
              justify="flex-end"
              align="flex-end"
              style={{ height: '100%' }}
            >
              <Button size="sm" variant="outline">
                Select
              </Button>
              <Button size="sm" variant="filled" bg="red">
                Leave
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>
    </Stack>
  );
}
