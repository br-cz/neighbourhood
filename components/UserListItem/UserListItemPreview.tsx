'use client';

import React from 'react';
import { Group, Avatar, Text, Box, Stack, Title } from '@mantine/core';
import { formatDate } from '@/utils/timeUtils';
import { User } from '@/types/types';

interface ProfileCardProps {
  user: User;
  relationshipStatus: string;
  onUpdate: () => void;
}

export function UserListItemPreview({ user, relationshipStatus, onUpdate }: ProfileCardProps) {
  //placeholder data - add to schema, queries, profile setup, and then finally replace these
  const phoneNumber = '204-123-4567';
  const address = '100 Waverley Dr.';
  const birthday = 'May 1, 2001';
  const age = 22; //age calculation from timeUtils
  const pronouns = 'he/him';
  const pets = 1;
  const kids = 0;

  return (
    <Box w={500} data-testid="profile-card">
      <Stack gap="xs">
        <Group>
          <Avatar src={user?.profilePic} size={48} radius="xl" />
          <Stack gap={0}>
            <Title order={6}>
              {user?.firstName} {user?.lastName}
            </Title>
            <Text c="dimmed" size="xs">
              {user?.bio || 'Excited to be part of the neighbourhood!'}
            </Text>
          </Stack>
        </Group>
        {relationshipStatus === 'friend' ? (
          <>
            <Group gap={50} mt="xs">
              <Stack gap="xs">
                <Text size="xs">
                  <b>Contact:</b> {phoneNumber}
                </Text>
                <Text size="xs">
                  <b>Address:</b> {address}
                </Text>
                <Text size="xs">
                  <b>Joined:</b> {formatDate(user?.createdAt)}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text size="xs">
                  <b>Pronouns:</b> {pronouns}
                </Text>
                <Text size="xs">
                  <b>Birthday:</b> {birthday} ({age} years)
                </Text>
                <Group>
                  <Text size="xs">
                    <b>Pets:</b> {pets}
                  </Text>
                  <Text size="xs">
                    <b>Kids:</b> {kids}
                  </Text>
                </Group>
              </Stack>
            </Group>
          </>
        ) : (
          <>
            <Group gap={50} mt="xs">
              <Stack gap="xs">
                <Text size="xs">
                  <b>Pronouns:</b> {pronouns}
                </Text>
                <Text size="xs">
                  <b>Joined:</b> {formatDate(user?.createdAt)}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text size="xs">
                  <b>Age:</b> {age}
                </Text>
                <Group>
                  <Text size="xs">
                    <b>Pets:</b> {pets}
                  </Text>
                  <Text size="xs">
                    <b>Kids:</b> {kids}
                  </Text>
                </Group>
              </Stack>
            </Group>
          </>
        )}
      </Stack>
    </Box>
  );
}
