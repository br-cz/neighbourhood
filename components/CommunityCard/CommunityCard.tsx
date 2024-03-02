import React, { useState } from 'react';
import { Avatar, Text, Card, Stack, Button, Flex, Grid } from '@mantine/core';
import { Community } from '@/src/API';

interface CommunityCardProps {
  community: Community;
  onSelect: () => void;
  currentUserID: string;
}

export default function CommunityCard({ community, currentUserID, onSelect }: CommunityCardProps) {
  // Get the current user's member object from the community
  const currentUserMemberObject = community.members?.items?.find(
    (member) => member?.user?.id === currentUserID
  );

  // Get the current user's friends' IDs
  const currentUserFriendsIds = currentUserMemberObject?.user.friends ?? [];

  // Get the current user's friends who are members of this community
  const friendsInCommunity = currentUserFriendsIds.filter((friendId) =>
    community?.members?.items.some((member) => member?.userId === friendId)
  );

  // Get the number of friends this user has in the community
  const numberOfFriendsInCommunity = friendsInCommunity.length;

  return (
    <Stack align="center">
      <Card shadow="md" withBorder w="27vw">
        <Grid align="stretch">
          <Grid.Col span={2}>
            <Avatar
              src={community?.image ?? './img/placeholder-img.jpg'}
              size="3.5vw"
              mt="xl"
              mb="xl"
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <Flex direction="column" justify="center" style={{ height: '100%' }}>
              <Text size="xl" fw={600}>
                {community?.name}
              </Text>
              <Text c="dimmed" size="md">
                Members: {community?.members?.items?.length}
              </Text>
              <Text c="dimmed" size="md">
                Friends: {numberOfFriendsInCommunity}
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
              <Button size="sm" variant="outline" onClick={onSelect}>
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
