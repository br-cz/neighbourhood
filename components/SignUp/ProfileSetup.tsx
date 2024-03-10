import React, {useState, useEffect} from 'react';
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
import { dateToAge } from '@/utils/timeUtils';
import { DatePickerInput } from '@mantine/dates';
import classes from './ProfileSetup.module.css';

// ******** MERGE WITH AL / MAIN BEFORE COMMITING
import { DateValue } from '@mantine/dates'; 
interface ProfileSetupProps {
  preferredUsername: string;
  firstName: string;
  familyName: string;
  phoneNumber: string;
  pronouns: string;
  profilePic: File | null;
  age: number;
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
    phoneNumber?: string;
    pronouns?: string;
    profilePic?: string;
    birthday?: string;
    age?: string;
    kids?: string;
    pets?: string;
  };
  touched: {
    preferredUsername?: boolean;
    firstName?: boolean;
    familyName?: boolean;
    phoneNumber?: boolean;
    pronouns?: boolean;
    profilePic?: boolean;
    birthday?: boolean;
    age?: boolean;
    kids?: boolean;
    pets?: boolean;
  };
}

export const ProfileSetup: React.FC<ProfileSetupProps> = ({
  preferredUsername,
  firstName,
  familyName,
  phoneNumber,
  pronouns,
  profilePic,
  birthday,
  age,
  kids,
  pets,
  setFieldValue,
  onChange,
  onBlur,
  errors,
  touched,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>('');
  const ageError = errors && errors.age ? errors.age : undefined;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>('');

  useEffect(() => {
    if (profilePic) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(profilePic);
    } 
    else {
      setImageSrc(undefined);
    }
  }, [profilePic]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setFieldValue('age', dateToAge(date as Date));
    setFieldValue('birthday', utcToISO(date));
  }

  const handleContactChange = (e: any) => {
    const { value } = e.target;
    const numericPhoneNumber = value.replace(/\D/g, '');
    const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setFieldValue('phoneNumber', formattedPhoneNumber);
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

  // ********** MERGE WITH AL / MAIN BEFORE COMMITING
  const utcToISO = (date: DateValue): string => {
    if (!date) return '';
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
  <Box w={400} >
    <Group justify="center">
      <Box w={150} h={150} onClick={handleImageUploadClick}  className={classes.avatar}>
        {previewImageUrl ? (
          <Image src={previewImageUrl} radius="xl" style={{ maxWidth: 150, maxHeight: 150 }} />
        ) : (
          <Avatar radius="xl" size={150} src={''} />
        )}
        <Stack gap="xs" className={classes.avatarOverlay}>
          {/* <FontAwesomeIcon icon={faPencil} size="lg" /> */}
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
        <Grid.Col span={6}>
          <DatePickerInput
            defaultValue={new Date()}
            radius="md"
            name="birthday"
            label="Birthday"
            value={selectedDate}
            placeholder="Pick a date"
            onChange={handleDateChange}
            maxDate={new Date()}
            onBlur={onBlur}
            error={selectedDate && ageError ? ageError : undefined}
            mt="md"
            data-testid="birthday"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            radius="md"
            name="pronouns"
            label="Pronouns"
            value={pronouns}
            placeholder="Choose pronouns"
            data={[
              { value: 'he/him', label: 'He/Him' },
              { value: 'she/her', label: 'She/Her' },
              { value: 'they/them', label: 'They/Them' },
              { value: 'other', label: 'Ask Me' },
            ]}
            onChange={(value) => setFieldValue('pronouns', value)}
            onBlur={onBlur}
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
            value={phoneNumber}
            onChange={handleContactChange}
            maxLength={14}
            onBlur={onBlur}
            error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : undefined}
            radius="md"
            data-testid="phone"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            label="Pets"
            defaultValue={pets}
            placeholder={'0'}
            min={0}
            step={1}
            value={pets}
            onChange={(value) => setFieldValue('pets', value)}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <NumberInput
            label="Kids"
            defaultValue={kids}
            placeholder={'0'}
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
