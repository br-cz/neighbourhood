'use client';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { useAuth } from '@/components/Authorization/useAuth';
import { Button, Group, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useFetchAllCommunities } from '@/src/hooks/communityCustomHooks';
import { Community } from '@/src/API';
import { createUserCommunityAPI } from '@/src/api/services/user';
import { SelectCommunity } from '../SignUp/SelectCommunity';
import { useFormik } from 'formik';
import { selectedCommunityModalSchema } from './selectCommunityModalValidation';

// Define the interface for the component's props
interface SelectCommunityModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function SelectCommunityModal({ opened, onClose }: SelectCommunityModalProps) {
  const { user } = useAuth();
  const { communities, loading } = useFetchAllCommunities();
  console.log('Communities in selectCommunity Modal:', communities);

  const [isLoading, handlers] = useDisclosure();
  const formik = useFormik({
    initialValues: {
      selectedCommunity: [],
    },

    validationSchema: selectedCommunityModalSchema,
    onSubmit: (values) => {
      handlers.open();
      values.selectedCommunity.forEach(async (communityId) => {
        const community = communities.find(
          (community: Community) => community.id === communityId
        ) as unknown as Community;
        console.log('Community:', community.name);

        const isMember = community?.members?.items.some(
          (member: any) => member.userId === user && !member?._deleted
        );

        if (!isMember) {
          try {
            await createUserCommunityAPI(user, community.id);
            notifications.show({
              radius: 'md',
              title: 'Yay!',
              message: `You are now part of ${community.name}`,
            });
          } catch (error) {
            notifications.show({
              radius: 'md',
              title: 'Sorry!',
              message: 'Failed to add your community. Please try again.',
            });
          }
        } else {
          notifications.show({
            radius: 'md',
            title: 'Oops!',
            message: `You are already part of ${community.name}`,
          });
        }
      });
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
      >
        <form onSubmit={formik.handleSubmit}>
          <SelectCommunity
            communities={communities}
            loading={loading}
            setFieldValue={formik.setFieldValue}
            onChange={formik.handleChange}
            selectedCommunity={formik.values.selectedCommunity}
            errors={formik.errors}
            touched={formik.touched}
          />
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
                      message: 'You have to pick at least one community to join it!',
                    });
                  }
                });
              }}
              loading={isLoading}
            >
              Select
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
