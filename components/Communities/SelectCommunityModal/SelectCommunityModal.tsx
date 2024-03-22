'use client';

import React from 'react';
import { Button, Center, Group, Modal, ScrollArea, SimpleGrid, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useFormik } from 'formik';
import {
  useFetchAllCommunities,
  useFetchRelevantCommunities,
} from '@/src/hooks/communityCustomHooks';
import { Community } from '@/src/API';
import { selectedCommunityModalSchema } from './selectCommunityModalValidation';
import { communitySelectHandler } from './communitySelectHandler';
import { CommunityListItem } from '../../CommunityListItem/CommunityListItem';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';

interface SelectCommunityModalProps {
  opened: boolean;
  userCommunities: Community[];
  onUpdate: () => void;
  onClose: () => void;
}

export default function SelectCommunityModal({
  opened,
  userCommunities,
  onUpdate,
  onClose,
}: SelectCommunityModalProps) {
  const { currentUser: user } = useCurrentUser();
  const { communities } = useFetchAllCommunities();
  const { relevantCommunities } = useFetchRelevantCommunities();
  const [isLoading, handlers] = useDisclosure();

  const formik = useFormik({
    initialValues: {
      selectedCommunity: '',
    },

    validationSchema: selectedCommunityModalSchema,
    onSubmit: async (values) => {
      handlers.open();
      await communitySelectHandler(values.selectedCommunity, communities, user.id, userCommunities);
      handlers.close();
      onClose();
      onUpdate();
      formik.resetForm();
    },
  });

  const initialCommunities = relevantCommunities?.length > 0 ? relevantCommunities : communities;
  const availableCommunities = initialCommunities.filter(
    (community: Community) => !userCommunities.some((uc: Community) => uc.id === community.id)
  );
  availableCommunities.sort((a: Community, b: Community) => a.name.localeCompare(b.name));

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          onClose();
          formik.resetForm();
        }}
        title={
          <Title order={3} component="p">
            Join a Community
          </Title>
        }
        size="auto"
        scrollAreaComponent={ScrollArea.Autosize}
        transitionProps={{ transition: 'pop' }}
      >
        <form onSubmit={formik.handleSubmit}>
          <SimpleGrid cols={1} spacing="xs" mt="sm" data-testid="communities">
            {availableCommunities.map((community: Community) => (
              <CommunityListItem
                key={community.id}
                community={community}
                onSelect={() => formik.setFieldValue('selectedCommunity', community.id)}
                selected={formik.values.selectedCommunity === community.id}
                isAnyCommunitySelected={!!formik.values.selectedCommunity}
              />
            ))}
          </SimpleGrid>
          <Center mt="xl">
            <Group gap="md">
              <Button
                radius="md"
                variant="default"
                onClick={() => {
                  onClose();
                  formik.resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                radius="md"
                type="button"
                onClick={() => {
                  formik.validateForm().then((errors) => {
                    if (Object.keys(errors).length === 0 && !isLoading) {
                      formik.submitForm();
                    } else {
                      notifications.show({
                        radius: 'md',
                        color: 'red',
                        title: 'Oops!',
                        message: `${errors.selectedCommunity}`,
                      });
                    }
                  });
                }}
                disabled={isLoading || !formik.dirty}
                loading={isLoading}
              >
                Join
              </Button>
            </Group>
          </Center>
        </form>
      </Modal>
    </>
  );
}
