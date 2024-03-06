'use client';

import React from 'react';
import { Group, Avatar, Text, Box, Stack, Title, Loader } from '@mantine/core';
import classes from './ProfileCard.module.css';
import { formatDate, formatUTCDate } from '@/utils/timeUtils';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

export function ProfileCard() {
  const { currentUser: user, loading } = useCurrentUser();

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
                       <b>Contact:</b> {user?.contact || 'N/A'}
                    </Text>
                    <Text size="sm">
                      <b>Address:</b> {user?.address || 'N/A'}
                    </Text>
                    <Text size="sm">
                      <b>Joined:</b> {formatDate(user?.createdAt)}
                    </Text>
                  </Stack>
                  <Stack gap="xs">
                    <Text size="sm">
                      <b>Pronouns:</b> {user?.pronouns || 'N/A'}
                    </Text>
                    <Text size="sm">
                      <b>Birthday:</b> {user?.birthday ? formatUTCDate(user?.birthday) : 'N/A'}
                    </Text>
                    <Group>
                      <Text size="sm">
                        <b>Pets:</b> {user?.pets || 'N/A'}
                      </Text>
                      <Text size="sm">
                        <b>Kids:</b> {user?.kids || 'N/A'}
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
