'use client';

import React from 'react';
import { Group, Avatar, Text, Box, Stack, Title, Loader } from '@mantine/core';
import classes from './ProfileCard.module.css';
import { formatDate } from '@/utils/timeUtils';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

export function ProfileCard() {
  const { currentUser: user, loading } = useCurrentUser();

  //placeholder data
  const phoneNumber = '204-123-4567';
  const address = '100 Waverley Dr.';
  const birthday = 'May 1, 2001 (22 years)';
  const pronouns = 'he/him';
  const pets = 1;
  const kids = 0;

  return (
    <>
      <Group justify="center" mt="50">
        {loading ? (
          <Loader />
        ) : (
          <Box w={1000} className={classes.card} data-testid="profile-card">
            <Group gap={50}>
              <Avatar src={user?.profilePic} size={150} radius="xl" />
              <Stack gap="xs">
                <Stack gap={0}>
                  <Title order={3}>
                    {user?.firstName} {user?.lastName}
                  </Title>
                  <Text c="dimmed" size="sm">
                    {user?.bio || 'Excited to be part of the neighbourhood!'}
                  </Text>
                </Stack>
                <Group gap={50} mt="xs">
                  <Stack gap="xs">
                    <Text size="sm">
                      <b>Contact:</b> {phoneNumber}
                    </Text>
                    <Text size="sm">
                      <b>Address:</b> {address}
                    </Text>
                    <Text size="sm">
                      <b>Joined:</b> {formatDate(user?.createdAt)}
                    </Text>
                  </Stack>
                  <Stack gap="xs">
                    <Text size="sm">
                      <b>Pronouns:</b> {pronouns}
                    </Text>
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
              </Stack>
            </Group>
          </Box>
        )}
      </Group>
    </>
  );
}
