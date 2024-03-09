import React, {useState, useEffect} from 'react';
import { Box, Group, Stack, Text, TextInput, Select, FileInput, Image } from '@mantine/core';

import { Pronouns } from '@/src/API'
import { DatePickerInput } from '@mantine/dates';

interface ProfileSetupProps {
  firstName: string;
  familyName: string;
  preferredUsername: string;
  phoneNumber: string;
  //pronouns: Pronouns;
  profilePic: File | null;
  //birthday: Date | null;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.FocusEvent<any>) => void;
  errors: {
    firstName?: string;
    familyName?: string;
    preferredUsername?: string;
    phoneNumber?: string;
    //pronouns?: string;
    //birthday?: string;
    profilePic?: string;
  };
  touched: {
    firstName?: boolean;
    familyName?: boolean;
    preferredUsername?: boolean;
    phoneNumber?: boolean;
    //pronouns?: boolean;
    //birthday?: boolean;
    profilePic?: boolean;
  };
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({
  firstName,
  familyName,
  preferredUsername,
  phoneNumber,
  //pronouns,
  //birthday,
  profilePic,
  setFieldValue,
  onChange,
  onBlur,
  errors,
  touched,
}) => {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (profilePic) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(profilePic);
    } else {
      setImageSrc(undefined);
    }
  }, [profilePic]);
  // const handleChangeBirthday = (date: any) => {
  //   console.log(date);
  //   console.log(date.getDate());
  //   setFieldValue('birthday', date.toISOString()); // Update the Formik state
  // };

  const handleContactChange = (e: any) => {
    const { value } = e.target;
    const numericPhoneNumber = value.replace(/\D/g, '');
    const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setFieldValue('phoneNumber', formattedPhoneNumber);

  };

  return (
  <Box w={400}>
    <Stack mt="lg" gap="md">
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
      <Group grow>
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
      </Group>
      <Group grow>
        {/* <DatePickerInput
            defaultValue={new Date()}
            radius="md"
            name="birthday"
            label="Birthday"
            value={birthday}
            placeholder="Pick a date"
            onBlur={onBlur}
            error={touched.birthday ? String(errors.birthday) : undefined}
            mt="md"
            data-testid="birthday"
          /> */}
          
        {/********** Uncomment when pronouns are added to user backend schema */}

        {/* <Select
            radius="md"
            name="pronouns"
            label="Pronouns"
            value={pronouns}
            placeholder="Choose pronouns"
            data={[
            // { value: Pronouns.HeHim, label: 'He/Him' },
            // { value: Pronouns.SheHer, label: 'She/Her' },
            // { value: Pronouns.TheyThem, label: 'They/Them' },
            { value: Pronouns.Other, label: 'Other' }]}
            onBlur={onBlur}
            comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 400 } }}
            error={touched.pronouns && errors.pronouns ? errors.pronouns : undefined}
            mt="md"
            data-testid="pronouns"
          /> */}
      </Group>

      <TextInput
        label={
          <>
            <Group gap={5}>
              <Text size="sm" fw={500}>
                Phone Number
              </Text>
              <Text size="sm" c="dimmed">
                (optional)
              </Text>
            </Group>
          </>
        }
        name="phoneNumber"
        value={phoneNumber}
        onChange={handleContactChange}
        maxLength={14}
        onBlur={onBlur}
        error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
        radius="md"
        data-testid="phone"
      />
      <Group grow>  
      
        <FileInput
          clearable
          accept="image/*"
          placeholder="Upload file"
          label={
            <>
              <Group gap={5}>
                <Text size="sm" fw={500}>
                Profile Picture
                </Text>
                <Text size="sm" c="dimmed">
                  (optional)
                </Text>
              </Group>
            </>
          }
          value={profilePic || undefined}
          name="profilePic"
          onChange={(file: File | null) => setFieldValue('profilePic', file || null)} 
          onBlur={onBlur}
          error={touched.profilePic && errors.profilePic ? errors.profilePic : undefined}
          radius="md"
          data-testid="profilePic"
        />
        
        {imageSrc && (
          <Image
            radius="md"
            h={150}
            w={150}
            src={imageSrc}
          />
        )}

      </Group>
    </Stack>
  </Box>
  );
};
