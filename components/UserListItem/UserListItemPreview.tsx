'use client';

import React, { useEffect, useState } from 'react';
import { Group, Avatar, Text, Box, Stack, Title } from '@mantine/core';
import { formatDate, getAge } from '@/utils/timeUtils';
import { User } from '@/types/types';
import { retrieveImage } from '../utils/s3Helpers/UserProfilePictureS3Helper';

interface UserListItemPreviewProps {
  user: User;
  relationshipStatus: string;
}

export function UserListItemPreview({ user, relationshipStatus }: UserListItemPreviewProps) {
  const [profilePic, setProfilePic] = useState<string>('');

  useEffect(() => {
    if (!user) return;
    retrieveImage(user?.id).then((image) => {
      setProfilePic(image);
    });
  }, [user?.profilePic]);

  return (
    <Box w={500} data-testid="preview-card">
      <Stack gap="xs">
        <Group>
          <Avatar src={profilePic} size={48} radius="xl" />
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
                  <b>Contact:</b> {user?.contact || 'N/A'}
                </Text>
                <Text size="xs">
                  <b>Address:</b> {`${user?.address?.split(',')[0]}.` || 'N/A'}
                </Text>
                <Text size="xs">
                  <b>Joined:</b> {formatDate(user?.createdAt)}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text size="xs">
                  <b>Pronouns:</b> {user?.pronouns || 'N/A'}
                </Text>
                <Text size="xs">
                  <b>Birthday:</b>{' '}
                  {user?.birthday
                    ? `${formatDate(user?.birthday)} (${getAge(user?.birthday)} years)`
                    : 'N/A'}
                </Text>
                <Group>
                  <Text size="xs">
                    <b>Pets:</b> {user?.pets || 0}
                  </Text>
                  <Text size="xs">
                    <b>Kids:</b> {user?.kids || 0}
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
                  <b>Pronouns:</b> {user?.pronouns || 'N/A'}
                </Text>
                <Text size="xs">
                  <b>Joined:</b> {formatDate(user?.createdAt)}
                </Text>
              </Stack>
              <Stack gap="xs">
                <Text size="xs">
                  <b>Age:</b> {user?.birthday ? `${getAge(user?.birthday)} years` : 'N/A'}
                </Text>
                <Group>
                  <Text size="xs">
                    <b>Pets:</b> {user?.pets || 0}
                  </Text>
                  <Text size="xs">
                    <b>Kids:</b> {user?.kids || 0}
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
