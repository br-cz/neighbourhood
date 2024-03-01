'use client';

import React from 'react';
import { Group, Avatar, Text, Box, Stack, Title } from '@mantine/core';
import classes from './ProfileCard.module.css';
import { formatDate } from '@/utils/timeUtils';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

export function ProfileCard() {
  const { currentUser: user } = useCurrentUser();

  //placeholder data
  const bio = "hi! i'm a u of m cs student. feel free to reach out for anything!";
  const phoneNumber = '204-123-4567';
  const address = '100 Waverley Dr.';
  const birthday = 'May 1, 2001 (22 years)';
  const pets = 1;
  const kids = 0;

  return (
    <Box w={1000} className={classes.card} data-testid="profile-card">
      <Group gap={50}>
        <Avatar src={user?.profilePic} size={150} radius="xl" />
        <Stack gap="sm">
          <div>
            <Title order={3}>
              {user?.firstName} {user?.lastName}
            </Title>
            <Text c="dimmed" size="sm">
              {bio}
            </Text>
          </div>
          <Group gap={50} mt="xs">
            <Stack>
              <Text size="sm">
                <b>Contact:</b> {phoneNumber}
              </Text>
              <Text size="sm">
                <b>Address:</b> {address}
              </Text>
            </Stack>
            <Stack>
              <Text size="sm">
                <b>Birthday:</b> {birthday}
              </Text>
              <Group>
                <Text size="sm">
                  <b>Pets:</b> {pets}
                </Text>
                <Text size="sm">
                  <b>Kids:</b> {kids}
                </Text>
              </Group>
            </Stack>
          </Group>
          <Text size="sm">
            <b>Joined:</b> {formatDate(user?.createdAt)}
          </Text>
        </Stack>
      </Group>
    </Box>
  );
}
