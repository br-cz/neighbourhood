import React from 'react';
import {
  Modal,
  Stack,
  Title,
  Box,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Center,
} from '@mantine/core';
import { useFormik } from 'formik';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { handleProfileUpdate } from '@/components/utils/profileUtils';
import { accountSettingsSchema } from './accountSettingsValidation';

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
        onClose,
        formik.resetForm
      );
      handlers.close();
    },
  });

  return (
    <Modal
      opened={opened}
      onClose={() => {
        formik.resetForm();
        onClose();
      }}
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
            <PasswordInput
              label="Current Password"
              name="oldPassword"
              value={formik.values.oldPassword}
              radius="md"
              data-testid="old-password-input"
              required
              onChange={(event) => formik.setFieldValue('oldPassword', event.target.value)}
              error={
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? formik.errors.oldPassword
                  : undefined
              }
            />
            <Title order={6} mt="xl">
              Change Email
            </Title>
            <TextInput
              placeholder="newemail@email.com"
              name="newEmail"
              value={formik.values.newEmail}
              radius="md"
              mt={5}
              data-testid="new-email-input"
              onChange={(event) => formik.setFieldValue('newEmail', event.target.value)}
              error={
                formik.touched.newEmail && formik.errors.newEmail
                  ? formik.errors.newEmail
                  : undefined
              }
            />
            <Center>
              <Text c="dimmed" mt="md">
                or
              </Text>
            </Center>
            <Title order={6}>Change Password</Title>
            <PasswordInput
              name="newPassword"
              placeholder="At least 8 characters"
              value={formik.values.newPassword}
              radius="md"
              mt={5}
              data-testid="new-password-input"
              onChange={(event) => formik.setFieldValue('newPassword', event.target.value)}
              error={
                formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : undefined
              }
            />
            <Center>
              <Button
                radius="md"
                mt="xl"
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
                        message:
                          "Couldn't update your information - please check your inputs and try again.",
                      });
                    }
                  });
                }}
                loading={loading}
              >
                Submit Changes
              </Button>
            </Center>
          </Box>
        </form>
      </Stack>
    </Modal>
  );
}
