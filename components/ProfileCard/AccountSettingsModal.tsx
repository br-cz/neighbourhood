import React, { useState } from 'react';
import { Modal, Text, Stack, Title, Box, TextInput, PasswordInput, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { handleProfileUpdate } from '@/app/profile/utils/profileUtils';
import { useFormik } from 'formik';
import { accountSettingsSchema } from './accountSettingsValidation';
import { notifications } from '@mantine/notifications';
interface AccountSettingsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function AccountSettingsModal({ opened, onClose }: AccountSettingsModalProps) {
  const [loading, handlers] = useDisclosure();
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newEmail: '',
    },
    validationSchema: accountSettingsSchema,
    onSubmit: async (parameters) => {
      handlers.open();
      await handleProfileUpdate(
        parameters.oldPassword,
        parameters.newPassword,
        parameters.newEmail,
      );

      onClose();
      formik.resetForm();
      handlers.close();
    },
  });


  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title order={2} component="p">
          Account Settings
        </Title>
      }
      size="sm"
      radius="md"
      padding={30}
      transitionProps={{ transition: 'pop' }}
      data-testid="account-settings-modal"
      closeButtonProps={{ 'aria-label': 'Close Modal' }}
    >
      <Stack gap="sm">
        <form>
          <Box>
            <Title order={5}>Edit Email</Title>
            <TextInput
              label="New Email"
              name="newEmail"
              value={formik.values.newEmail}
              radius="md"
              mt="sm"
              data-testid="new-email-input"
              onChange={(event) => formik.setFieldValue('newEmail', event.target.value)}
              error={
                formik.touched.newEmail && formik.errors.newEmail
                  ? formik.errors.newEmail
                  : undefined
              }
            />
            <Title order={5} mt="xl">
              Edit Password
            </Title>
            <PasswordInput
              label="Old Password"
              name="oldPassword"
              value={formik.values.oldPassword}
              radius="md"
              mt="md"
              data-testid="old-password-input"
              onChange={(event) => formik.setFieldValue('oldPassword', event.target.value)}
              error={
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? formik.errors.oldPassword
                  : undefined
              }
            />
            <PasswordInput
              label="New Password"
              name="newPassword"
              value={formik.values.newPassword}
              radius="md"
              mt="md"
              data-testid="new-password-input"
              onChange={(event) => formik.setFieldValue('newPassword', event.target.value)}
              error={
                formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : undefined
              }
            />
            <Button
              radius="md"
              mt="lg"
              type="button"
              data-testid="submit-btn"
              onClick={() => {
                console.log(formik.values); // For logging
                formik.validateForm().then((errors) => {
                  console.log(errors); // For logging
                  if (Object.keys(errors).length === 0 && !loading) {
                    // No errors, form is valid so we submit
                    formik.submitForm();
                  } else {
                    notifications.show({
                      radius: 'md',
                      color: 'red',
                      title: 'Oops!',
                      message: "Couldn't update your information - please check your inputs and try again.",
                    });
                  }
                });
              }}
              loading={loading}
            >
              Submit Changes
            </Button>
          </Box>
        </form>
      </Stack>
    </Modal>
  );
}
