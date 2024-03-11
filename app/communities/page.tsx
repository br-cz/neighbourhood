'use client';

import React, { useState } from 'react';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { useAuth } from '@/components/Authorization/useAuth';
import { Button, Group, Title, Stack, Loader, Flex, Text, Modal } from '@mantine/core';
import CommunityCard from '@/components/CommunityCard/CommunityCard';
import { IconPlus } from '@tabler/icons-react';
import {
  useFetchAllCommunities,
  useFetchAllUserCommunities,
} from '@/src/hooks/communityCustomHooks';
import { Community } from '@/src/API';
import SelectCommunityModal from '@/components/SelectCommunityModal/SelectCommunityModal';
import { useDisclosure } from '@mantine/hooks';
import { handleSwitch, handleDeselect } from './utils/communityUtils';

export default function CommunitiesPage() {
  const [refresh, setRefresh] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<Community>();
  const { user } = useAuth();
  const { communities, loading } = useFetchAllCommunities(refresh);
  const toggleRefresh = () => setRefresh((flag) => !flag);
  const [openedModal, { open, close }] = useDisclosure(false);
  const [openConfirmationModal, { open: openConfirmation, close: closeConfirmation }] =
    useDisclosure(false);
  const { userCommunityList } = useFetchAllUserCommunities(refresh);
  const userCommunities = Object.values(communities).filter((community: Community) =>
    community.members?.items?.some((member) => member?.user?.id === user && !member?._deleted)
  );

  const handleCommunitySwitch = async (community: any) =>
    await handleSwitch(user, community, toggleRefresh);

  const handleCommunityDeselect = async (community: any) =>
    await handleDeselect(user, community, userCommunities, userCommunityList, toggleRefresh);
  if (!user) return null;

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m={20}>
        <Title order={1}>My Communities</Title>
      </Group>
      {loading ? (
        <Group justify="center" align="center" h="50vh">
          <Loader />
        </Group>
      ) : (
        <>
          <Stack mt="md" gap="xl" align="center">
            {userCommunities.map((community: Community) => (
              <CommunityCard
                key={community.id}
                community={community}
                currentUserID={user}
                onSelect={() => handleCommunitySwitch(community)}
                onDeselect={() => {
                  openConfirmation(), setSelectedCommunity(community);
                }}
              />
            ))}
            <Modal
              opened={openConfirmationModal}
              onClose={closeConfirmation}
              title={
                <span style={{ fontWeight: '600', fontSize: '18px' }}>
                  Leaving {selectedCommunity?.name}
                </span>
              }
              centered
              overlayProps={{
                backgroundOpacity: 0.4,
                blur: 2,
              }}
              size="28%"
            >
              <Text size="md">
                Are you sure you want to leave this community? You will no longer be able to access
                the feed.
              </Text>
              <Group justify="end" mt="lg" gap="md">
                <Button onClick={closeConfirmation}>Don't Leave</Button>
                <Button
                  color="red"
                  onClick={() => {
                    handleCommunityDeselect(selectedCommunity);
                    closeConfirmation();
                  }}
                >
                  Leave Community
                </Button>
              </Group>
            </Modal>
            {/* <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ blur: 1 }} /> */}
            <Button size="md" variant="outline" leftSection={<IconPlus size={15} />} onClick={open}>
              Add New
            </Button>
          </Stack>
          <SelectCommunityModal
            opened={openedModal}
            userCommunities={userCommunities}
            onClose={() => {
              close(), toggleRefresh();
            }}
          />
        </>
      )}
    </NeighbourhoodShell>
  );
}
