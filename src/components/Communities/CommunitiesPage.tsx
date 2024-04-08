'use client';

import React, { useEffect, useState } from 'react';
import { Button, Group, Title, Stack, Loader, Text, Tooltip, SimpleGrid } from '@mantine/core';
import { modals } from '@mantine/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useDisclosure } from '@mantine/hooks';
import { useAuth } from '@/src/components/Authorization/useAuth';
import CommunityCard from '@/src/components/Communities/CommunityCard/CommunityCard';
import {
  useFetchAllCommunities,
  useFetchAllUserCommunities,
} from '@/src/hooks/communityCustomHooks';
import { Community } from '@/src/API';
import SelectCommunityModal from '@/src/components/Communities/SelectCommunityModal/SelectCommunityModal';
import { switchCommunity, leaveCommunity } from '../utils/communityUtils';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

export default function CommunitiesPage() {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh((flag) => !flag);
  const { user } = useAuth();
  const { currentUser } = useCurrentUser();
  const { communities, loading } = useFetchAllCommunities(refresh);
  const [selectedCommunity, setSelectedCommunity] = useState<string>();
  const [openedModal, { open, close }] = useDisclosure(false);
  const { userCommunityList } = useFetchAllUserCommunities(refresh);

  const userCommunities = Object.values(communities).filter((community: Community) =>
    community.members?.items?.some((member) => member?.user?.id === user && !member?._deleted)
  );

  console.log(JSON.stringify(userCommunities, null, 2));

  userCommunities.sort((a: Community, b: Community) => a.name.localeCompare(b.name));

  useEffect(() => {
    setSelectedCommunity(currentUser?.selectedCommunity);
  }, [currentUser?.selectedCommunity]);

  const handleSwitchCommunity = async (community: any) => {
    switchCommunity(user, community, setSelectedCommunity);
  };

  const handleLeaveCommunity = async (community: any) =>
    leaveCommunity(
      user,
      community,
      userCommunities,
      userCommunityList,
      setSelectedCommunity,
      toggleRefresh
    );

  const openConfirmSwitchModal = (community: any) => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Switch community?
        </Title>
      ),
      children: (
        <Text size="sm">Are you sure you want to switch to the {community?.name} community?</Text>
      ),
      confirmProps: { size: 'xs', radius: 'md' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Confirm', cancel: 'Back' },
      onConfirm: () => handleSwitchCommunity(community),
    });
  };

  const openConfirmLeaveModal = (community: any) => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Sign out?
        </Title>
      ),
      children: (
        <Text size="sm">Are you sure you want to leave the {community?.name} community?</Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red.6' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Leave Community', cancel: 'Back' },
      onConfirm: () => handleLeaveCommunity(community),
    });
  };

  return (
    <>
      <Group justify="space-between" m={20}>
        <Title order={1}>My Communities</Title>
      </Group>
      {loading ? (
        <Group justify="center" align="center" mt={200}>
          <Loader />
        </Group>
      ) : (
        <>
          <Stack mt="lg" gap="xl" align="center">
            <SimpleGrid cols={1} spacing="xs" mt="sm" data-testid="joined-communities">
              {userCommunities.map((community: Community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  currentUser={currentUser}
                  isSelected={selectedCommunity === community.id}
                  onSelect={() => {
                    openConfirmSwitchModal(community);
                  }}
                  onLeave={() => {
                    openConfirmLeaveModal(community);
                  }}
                  disableLeaveButton={userCommunities.length <= 1}
                />
              ))}
            </SimpleGrid>
            <Tooltip
              label="You can only join a maximum of 3 communities!"
              disabled={userCommunities.length < 3}
            >
              <Button
                size="md"
                variant="outline"
                leftSection={<FontAwesomeIcon icon={faPlusCircle} />}
                onClick={open}
                disabled={userCommunities.length === 3}
                data-testid="add-community-btn"
              >
                Add New
              </Button>
            </Tooltip>
          </Stack>

          <SelectCommunityModal
            opened={openedModal}
            userCommunities={userCommunities}
            onUpdate={toggleRefresh}
            onClose={() => {
              close();
            }}
          />
        </>
      )}
    </>
  );
}
