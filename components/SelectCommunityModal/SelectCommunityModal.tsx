'use client';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { useAuth } from '@/components/Authorization/useAuth';
import { Button, Group, Modal, ScrollArea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useFetchAllCommunities } from '@/src/hooks/communityCustomHooks';
import { Community } from '@/src/API';
import { SelectCommunity } from '../SignUp/SelectCommunity';
import { useFormik } from 'formik';
import { selectedCommunityModalSchema } from './selectCommunityModalValidation';
import { commmunitySelectHandler } from './communitySelectHandler';

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
  const { communities, loading } = useFetchAllCommunities();
  //console.log('Communities in selectCommunity Modal:', communities);

  const [isLoading, handlers] = useDisclosure();
  const formik = useFormik({
    initialValues: {
      selectedCommunity: [],
    },

    validationSchema: selectedCommunityModalSchema,
    onSubmit: (values) => {
      handlers.open();
      if (values.selectedCommunity.length + userCommunities.length > 3) {
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
      values.selectedCommunity.forEach(async (communityId) => {
        await commmunitySelectHandler(communityId, communities, user, userCommunities);
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
        scrollAreaComponent={ScrollArea.Autosize}
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
                      message: `${errors.selectedCommunity}`,
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
