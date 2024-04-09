'use client';

import React from 'react';
import { Group, Avatar, Text, Box, Stack, Title, Loader } from '@mantine/core';
import classes from './ProfileCard.module.css';
import { formatDate, formatUTCDate, getAge } from '@/src/utils/timeUtils';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

interface ProfileCardProps {
  refresh: boolean;
}

export function ProfileCard({ refresh }: ProfileCardProps) {
  const { currentUser: user, loading } = useCurrentUser(refresh);
  const profilePic = user?.profilePic || './img/placeholder-profile.jpg';

  return (
    <>
      <Group justify="center" mt="50">
        {loading ? (
          <Loader />
        ) : (
          <Box w={1000} className={classes.card} data-testid="profile-card">
            <Group gap={50}>
              <Box w={150} h={150}>
                <Avatar src={profilePic} className={classes.avatar} radius="xl" />
              </Box>
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
                      <b>Address:</b> {user?.address?.split(',')[0] || 'N/A'}
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
                      <b>Birthday:</b>{' '}
                      {user?.birthday
                        ? `${formatUTCDate(user?.birthday)} (${getAge(user?.birthday)} years)`
                        : 'N/A'}
                    </Text>
                    <Group>
                      <Text size="sm">
                        <b>Pets:</b> {user?.pets || '0'}
                      </Text>
                      <Text size="sm">
                        <b>Kids:</b> {user?.kids || '0'}
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
