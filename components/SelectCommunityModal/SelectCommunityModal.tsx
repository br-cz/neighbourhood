'use client';

import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { Button, Group, Modal, ScrollArea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useFormik } from 'formik';
import {
  useFetchAllCommunities,
  useFetchRelevantCommunities,
} from '@/src/hooks/communityCustomHooks';
import { Community } from '@/src/API';
import { selectedCommunityModalSchema } from './selectCommunityModalValidation';
import { commmunitySelectHandler } from './communitySelectHandler';
import { CommunityListItem } from '../CommunityListItem/CommunityListItem';
import { useAuth } from '../Authorization/useAuth';

interface SelectCommunityModalProps {
  opened: boolean;
  userCommunities: Community[];
  onClose: () => void;
}

export default function SelectCommunityModal({
  opened,
  userCommunities,
  onClose,
}: SelectCommunityModalProps) {
  const { user } = useAuth();
  const { communities } = useFetchAllCommunities();
  const { relevantCommunities } = useFetchRelevantCommunities();

  let availableCommunities = communities.filter(
    (community: Community) => !userCommunities.some((uc: Community) => uc.id === community.id)
  );

  if (relevantCommunities?.length > 0) {
    availableCommunities = relevantCommunities.filter(
      (community: Community) => !userCommunities.some((uc: Community) => uc.id === community.id)
    );
  }

  const [isLoading, handlers] = useDisclosure();
  const formik = useFormik({
    initialValues: {
      selectedCommunity: '',
    },

    validationSchema: selectedCommunityModalSchema,
    onSubmit: async (values) => {
      handlers.open();
      if (values.selectedCommunity !== '' && userCommunities.length === 3) {
        notifications.show({
          radius: 'md',
          color: 'red',
          title: 'Oops!',
          message:
            'You current number of selected communities exceeds the maximum limit of 3 that you can join!',
        });
        handlers.close();
        formik.resetForm();
        onClose();
        return;
      }
      await commmunitySelectHandler(values.selectedCommunity, communities, user, userCommunities);
      handlers.close();
      formik.resetForm();
      onClose();
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          formik.resetForm();
          onClose();
        }}
        title={<span style={{ fontWeight: '600' }}>Select Your Communities</span>}
        size="auto"
        overlayProps={{
          backgroundOpacity: 0.4,
          blur: 2,
        }}
        centered
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <form onSubmit={formik.handleSubmit}>
          {availableCommunities.map((community: Community) => (
            <CommunityListItem
              community={community}
              onSelect={() => formik.setFieldValue('selectedCommunity', community.id)}
              selected={formik.values.selectedCommunity === community.id}
              isAnyCommunitySelected={!!formik.values.selectedCommunity}
            />
          ))}
          <Group justify="end" mt="xl" gap="xl">
            <Button radius="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              radius="md"
              type="button"
              onClick={() => {
                formik.validateForm().then((errors) => {
                  //console.log('This are the errors', errors);
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
              loading={isLoading}
            >
              Join
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
