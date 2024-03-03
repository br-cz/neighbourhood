'use client';

import React, { useState } from 'react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { Button, Group, Title, Stack, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import CommunityCard from '@/components/CommunityCard/CommunityCard';
import { IconPlus } from '@tabler/icons-react';
import {
  useFetchAllCommunities,
  useFetchAllUserCommunities,
} from '@/src/hooks/communityCustomHooks';
import { Community, UserCommunity } from '@/src/API';
import { deleteUserCommunityAPI } from '@/src/api/services/user';
import SelectCommunityModal from '@/components/SelectCommunityModal/SelectCommunityModal';
import { useDisclosure } from '@mantine/hooks';
import { switchCommunityAPI } from '@/src/api/services/community';
import { getCurrentCommunityID } from '@/src/hooks/communityCustomHooks';

export default function CommunitiesPage() {
  const [refresh, setRefresh] = useState(false);
  const { user } = useAuth();
  const { communities, loading } = useFetchAllCommunities(refresh);
  const toggleRefresh = () => setRefresh((flag) => !flag);
  const [openedModal, { open, close }] = useDisclosure(false);

  const { userCommunityList } = useFetchAllUserCommunities(refresh);

  // Filter communities to only those where the user is a member
  const userCommunities = Object.values(communities).filter((community: Community) =>
    community.members?.items?.some((member) => member?.user?.id === user)
  );

  const handleCommunitySwitch = async (community: any) => {
    try {
      await switchCommunityAPI(user, community.id);
      localStorage.setItem('currentCommunityID', JSON.stringify(community.id));
      localStorage.setItem('currentCommunity', JSON.stringify(community));
      notifications.show({
        radius: 'md',
        title: 'Yay!',
        message: `You have switched to ${community.name} community`,
      });
    } catch (error) {
      console.log('Error:', error);
      notifications.show({
        radius: 'md',
        title: 'Sorry!',
        message: 'Failed to switch the community. Please try again.',
      });
    }
    toggleRefresh();
    console.log('Testing switch', getCurrentCommunityID());
  };

  const handleCommunityDeselect = async (community: any) => {
    const relationship = userCommunityList.find(
      (userCommunity: UserCommunity) =>
        userCommunity.communityId === community.id && userCommunity.userId === user
    ) as unknown as UserCommunity;
    try {
      console.log('Deleting user community:', relationship.id);
      await deleteUserCommunityAPI(relationship.id);
      notifications.show({
        radius: 'md',
        title: 'We are sorry to see you go!',
        message: `You are no longer part of ${community.name}`,
      });
    } catch (error) {
      console.log('Error:', error);
      notifications.show({
        radius: 'md',
        title: 'Sorry!',
        message: 'Failed to leave the community. Please try again.',
      });
    }
    toggleRefresh();
  };

  if (!user) return null;

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m={20}>
        <Title order={1}>My Communities</Title>
      </Group>
      <Stack mt="md" gap="xl" align="center">
        {userCommunities.map((community: Community) => (
          <CommunityCard
            key={community.id}
            community={community}
            currentUserID={user}
            onSelect={() => handleCommunitySwitch(community)}
            onDeselect={() => handleCommunityDeselect(community)}
          />
        ))}
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 1 }} />
        <Button size="md" variant="outline" leftSection={<IconPlus size={15} />} onClick={open}>
          Add New
        </Button>
      </Stack>
      <SelectCommunityModal
        opened={openedModal}
        onClose={() => {
          close(), toggleRefresh();
        }}
      />
    </NeighbourhoodShell>
  );
}
