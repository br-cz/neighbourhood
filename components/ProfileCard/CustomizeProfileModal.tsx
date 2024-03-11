import React, { useRef, useState } from 'react';
import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  Stack,
  Title,
  Group,
  Select,
  Text,
  Image,
  Avatar,
  Box,
  Grid,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { DatePickerInput } from '@mantine/dates';
import { useFormik } from 'formik';
import { customizeProfileSchema } from './customizeProfileValidation';
import { useCurrentUser, userUpdateSubject } from '@/src/hooks/usersCustomHooks';
import classes from './ProfileCard.module.css';
import { utcToISO } from '@/utils/timeUtils';
import { storeImage } from '@/components/utils/s3Helpers/UserProfilePictureS3Helper';

interface CustomizeProfileModalProps {
  opened: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function CustomizeProfileModal({ opened, onClose, onUpdate }: CustomizeProfileModalProps) {
  const { currentUser: user, updateUserProfile } = useCurrentUser();
  const [previewImageUrl, setPreviewImageUrl] = useState(user?.profilePic || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, loadingToggle] = useDisclosure();
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      bio: user?.bio || '',
      contact: user?.contact || '',
      pronouns: user?.pronouns || '',
      birthday: user?.birthday || '',
      kids: user?.kids || 0,
      pets: user?.pets || 0,
    },
    validationSchema: customizeProfileSchema,
    onSubmit: async (values) => {
      let imageUrl = user?.profilePic;
      if (selectedFile && user) {
        try {
          imageUrl = await storeImage(selectedFile, user.id);
        } catch (error) {
          notifications.show({
            title: 'Error',
            message: 'Failed to upload profile picture.',
            color: 'red',
          });
          console.error('Failed to upload image:', error);
          return;
        }
      }
      const updatedValues = { ...values, profilePic: imageUrl };
      await updateUserProfile(updatedValues).then(() => {
        onUpdate();
        onClose();
        formik.resetForm();
        setPreviewImageUrl(user?.profilePic || '');
        notifications.show({
          radius: 'md',
          title: 'Profile Updated',
          message: 'Your new information is now visible to your friends/neighbours.',
        });
      });
      loadingToggle.close();
      userUpdateSubject.next();
    },
    enableReinitialize: true,
  });

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleContactChange = (e: any) => {
    const { value } = e.target;
    const numericPhoneNumber = value.replace(/\D/g, '');
    const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    formik.setFieldValue('contact', formattedPhoneNumber);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose();
        formik.resetForm();
        setPreviewImageUrl(user?.profilePic || '');
      }}
      title={
        <Title order={2} component="p">
          Customize Profile
        </Title>
      }
      size="md"
    >
      <form onSubmit={formik.handleSubmit}>
        <Group justify="center">
          <Box w={150} h={150} onClick={handleImageUploadClick} className={classes.avatar}>
            {previewImageUrl ? (
              <Image src={previewImageUrl} radius="xl" style={{ maxWidth: 150, maxHeight: 150 }} />
            ) : (
              <Avatar radius="xl" size={150} src={user?.profilePic} />
            )}
            <Stack gap="xs" className={classes.avatarOverlay}>
              <FontAwesomeIcon icon={faPencil} size="lg" />
              <Text fz="sm" fw={500}>
                Edit
              </Text>
            </Stack>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </Box>

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="First Name"
                defaultValue={user?.firstName}
                placeholder={user?.firstName}
                {...formik.getFieldProps('firstName')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Last Name"
                defaultValue={user?.lastName}
                placeholder={user?.lastName}
                {...formik.getFieldProps('lastName')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Bio"
                defaultValue={user?.bio}
                placeholder={user?.bio}
                {...formik.getFieldProps('bio')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                radius="md"
                label="Contact"
                defaultValue={user?.contact}
                placeholder={user?.contact}
                {...formik.getFieldProps('contact')}
                data-testid="contact"
                onChange={handleContactChange}
                maxLength={14}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                radius="md"
                label="Pronouns"
                defaultValue={user?.pronouns}
                placeholder={user?.pronouns}
                data={[
                  { value: 'he/him', label: 'He/Him' },
                  { value: 'she/her', label: 'She/Her' },
                  { value: 'they/them', label: 'They/Them' },
                  { value: 'other', label: 'Ask Me' },
                ]}
                onChange={(value) => formik.setFieldValue('pronouns', value)}
                onBlur={() => formik.setFieldTouched('pronouns', true)}
                data-testid="pronouns"
                comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 300 } }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DatePickerInput
                radius="md"
                label="Birthday"
                defaultValue={user?.birthday ? new Date(`${user.birthday}T00:00:00`) : undefined}
                data-testid="date"
                onChange={(value) => {
                  const isoDateWithoutTimezone = utcToISO(value);
                  formik.setFieldValue('birthday', isoDateWithoutTimezone);
                }}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="Pets"
                defaultValue={user?.pets}
                placeholder={user?.pets}
                min={0}
                step={1}
                value={formik.values.pets}
                onChange={(value) => formik.setFieldValue('pets', value)}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                label="Kids"
                defaultValue={user?.kids}
                placeholder={user?.kids}
                min={0}
                step={1}
                value={formik.values.kids}
                onChange={(value) => formik.setFieldValue('kids', value)}
              />
            </Grid.Col>
          </Grid>
          <Button
            mt="md"
            loading={loading}
            onClick={() => {
              loadingToggle.open();
              formik.validateForm().then((errors) => {
                if (Object.keys(errors).length === 0) {
                  formik.submitForm();
                } else {
                  loadingToggle.close();
                  notifications.show({
                    radius: 'md',
                    color: 'red.6',
                    title: 'Oops!',
                    message: `Couldn't update your profile: ${Object.values(errors)}`,
                  });
                }
              });
            }}
          >
            Save Changes
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
