import React, { useState } from 'react';
import {
  TextInput,
  NumberInput,
  Stack,
  Group,
  Select,
  Image,
  Avatar,
  Box,
  Grid,
  Divider,
  Tooltip,
  Text,
  Center,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faPencil } from '@fortawesome/free-solid-svg-icons';
import classes from './ProfileSetup.module.css';
import { utcToISO } from '@/utils/timeUtils';
import { handleContactChange } from '@/utils/contactUtils';

interface ProfileSetupProps {
  preferredUsername: string;
  firstName: string;
  familyName: string;
  contact: string;
  bio: string;
  pronouns: string;
  profilePic: File | null;
  birthday: string;
  kids: number;
  pets: number;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  errors: {
    preferredUsername?: string;
    firstName?: string;
    familyName?: string;
    bio?: string;
    contact?: string;
    pronouns?: string;
    profilePic?: string;
    birthday?: string;
    kids?: string;
    pets?: string;
  };
  touched: {
    preferredUsername?: boolean;
    bio?: boolean;
    firstName?: boolean;
    familyName?: boolean;
    contact?: boolean;
    pronouns?: boolean;
    profilePic?: boolean;
    birthday?: boolean;
    kids?: boolean;
    pets?: boolean;
  };
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({
  preferredUsername,
  firstName,
  familyName,
  contact,
  bio,
  pronouns,
  // These variables are used via setFieldValue, but not recognized by eslint
  profilePic, // eslint-disable-line @typescript-eslint/no-unused-vars
  birthday, // eslint-disable-line @typescript-eslint/no-unused-vars
  kids,
  pets,
  setFieldValue,
  onChange,
  onBlur,
  errors,
  touched,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>('');

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFieldValue('birthday', utcToISO(date));
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
      setFieldValue('profilePic', file);
    }
  };

  return (
    <Box w={400} mt={20}>
      <Group justify="center">
        <Box w={100} h={100} onClick={handleImageUploadClick} className={classes.avatarUpload}>
          {previewImageUrl ? (
            <Image
              src={previewImageUrl}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          ) : (
            <Avatar radius="xl" size={100} />
          )}
          <Stack gap="xs" className={classes.avatarUploadOverlay}>
            <FontAwesomeIcon icon={faPencil} />
            <Text fz="xs" fw={500}>
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
          <Grid.Col span={12}>
            <TextInput
              label="Username"
              name="preferredUsername"
              value={preferredUsername}
              onChange={onChange}
              onBlur={onBlur}
              error={
                touched.preferredUsername && errors.preferredUsername
                  ? errors.preferredUsername
                  : undefined
              }
              radius="md"
              data-testid="username"
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={onChange}
              onBlur={onBlur}
              error={touched.firstName && errors.firstName ? errors.firstName : undefined}
              radius="md"
              data-testid="firstName"
              required
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Last Name"
              name="familyName"
              value={familyName}
              onChange={onChange}
              onBlur={onBlur}
              error={touched.familyName && errors.familyName ? errors.familyName : undefined}
              radius="md"
              data-testid="lastName"
              required
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Divider mt="lg" />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              radius="md"
              name="bio"
              label="Bio"
              value={bio}
              placeholder="Tell us a little about yourself..."
              onChange={onChange}
              onBlur={onBlur}
              error={touched.bio && errors.bio ? errors.bio : undefined}
              mt="md"
              data-testid="bio"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DatePickerInput
              defaultValue={new Date()}
              radius="md"
              name="birthday"
              placeholder="Optional"
              label="Birthday"
              value={selectedDate}
              onChange={handleDateChange}
              maxDate={new Date()}
              onBlur={onBlur}
              error={touched.birthday && errors.birthday ? errors.birthday : undefined}
              mt="md"
              data-testid="birthday"
              rightSection={
                <Tooltip
                  label="Your age will be visible to your community, but your birthday only to friends."
                  position="top-end"
                  withArrow
                  transitionProps={{ transition: 'pop-bottom-right' }}
                >
                  <Text component="div" c="dimmed" style={{ cursor: 'help' }}>
                    <Center>
                      <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                    </Center>
                  </Text>
                </Tooltip>
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              radius="md"
              name="pronouns"
              label="Pronouns"
              value={pronouns}
              data={[
                { value: 'he/him', label: 'He/Him' },
                { value: 'she/her', label: 'She/Her' },
                { value: 'they/them', label: 'They/Them' },
                { value: 'other', label: 'Ask Me' },
              ]}
              onChange={(value) => setFieldValue('pronouns', value)}
              onBlur={onBlur}
              placeholder="Optional"
              comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 400 } }}
              error={touched.pronouns && errors.pronouns ? errors.pronouns : undefined}
              mt="md"
              data-testid="pronouns"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Phone Number"
              name="phoneNumber"
              value={contact}
              onChange={(e) => handleContactChange(e, setFieldValue)}
              placeholder="Optional"
              maxLength={14}
              onBlur={onBlur}
              error={touched.contact && errors.contact ? errors.contact : undefined}
              radius="md"
              data-testid="phone"
              rightSection={
                <Tooltip
                  label="Your phone number will be visible only to your friends and marketplace listings."
                  position="top-end"
                  withArrow
                  transitionProps={{ transition: 'pop-bottom-right' }}
                >
                  <Text component="div" c="dimmed" style={{ cursor: 'help' }}>
                    <Center>
                      <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                    </Center>
                  </Text>
                </Tooltip>
              }
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <NumberInput
              label="Pets"
              defaultValue={0}
              placeholder="0"
              min={0}
              step={1}
              value={pets}
              onChange={(value) => setFieldValue('pets', value)}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <NumberInput
              label="Kids"
              defaultValue={0}
              placeholder="0"
              min={0}
              step={1}
              value={kids}
              onChange={(value) => setFieldValue('kids', value)}
            />
          </Grid.Col>
        </Grid>
      </Group>
    </Box>
  );
};
