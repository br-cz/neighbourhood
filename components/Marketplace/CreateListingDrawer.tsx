import React, { useState } from 'react';
import {
  Drawer,
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  Text,
  Title,
  NumberInput,
  Grid,
  ActionIcon,
  Box,
  Stack,
  Image,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload, faImage, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useFormik } from 'formik';
import { Visibility } from '@/src/API';
import { useCreateListing } from '@/src/hooks/marketplaceCustomHooks';
import { createListingSchema } from './createListingValidation';
import { useCurrentUser } from '@/src/hooks/usersCustomHooks';
import { storeImage } from '@/components/utils/s3Helpers/ItemForSaleImageS3Helper';
import { handleContactChange } from '@/utils/contactUtils';

interface CreateListingDrawerProps {
  opened: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export function CreateListingDrawer({ opened, onClose, onPostCreated }: CreateListingDrawerProps) {
  const { currentUser: user } = useCurrentUser();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [loading, handlers] = useDisclosure();
  const { handleCreateListing } = useCreateListing();

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      description: '',
      contact: user?.contact,
      visibility: Visibility.PUBLIC,
    },
    validationSchema: createListingSchema,
    onSubmit: async (parameters) => {
      handlers.open();
      const listingData = {
        title: parameters.title,
        price: parameters.price,
        description: parameters.description,
        contact: parameters.contact,
        visibility: parameters.visibility,
      };
      try {
        const createdListing = (await handleCreateListing(listingData)) as {
          id: string;
          _version: number;
        };

        if (files.length > 0 && createdListing && createdListing.id) {
          await storeImage(files[0], createdListing.id);
        }

        onPostCreated();
        notifications.show({
          radius: 'md',
          color: 'yellow.6',
          title: 'Cha-ching!',
          message: 'Your item is now up for sale and visible to your neighbours.',
        });
      } catch (error) {
        console.error('Error creating listing:', error);
        notifications.show({
          title: 'Oops!',
          message: 'Something went wrong creating your listing - please try again.',
          color: 'red.6',
        });
      } finally {
        handlers.close();
        onClose();
        setFiles([]);
        formik.resetForm();
      }
    },
    enableReinitialize: true,
  });

  const previews = files.map((file: FileWithPath, index: any) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        radius="md"
        mt="xs"
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        style={{ maxWidth: 400, maxHeight: 250 }}
        data-testid="image-preview"
      />
    );
  });

  const handleDropImage = async (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFiles([file]);
    }
  };

  const handleRemoveImage = () => {
    setFiles([]);
    formik.setFieldValue('eventImage', null);
  };

  return (
    <Drawer
      offset={8}
      radius="md"
      opened={opened}
      onClose={() => {
        formik.resetForm();
        setFiles([]);
        onClose();
      }}
      position="right"
      title={
        <Title order={3} component="p" data-testid="create-listing-drawer">
          New Listing
        </Title>
      }
      padding="lg"
      size="md"
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid>
          <Grid.Col span={8}>
            <TextInput
              radius="md"
              label="Item"
              placeholder="What are you selling?"
              {...formik.getFieldProps('title')}
              data-testid="title-input"
              required
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              radius="md"
              label="Price"
              placeholder="$"
              thousandSeparator=","
              min={0}
              step={1}
              prefix="$"
              value={formik.values.price}
              onChange={(value) => formik.setFieldValue('price', value)}
              stepHoldDelay={500}
              stepHoldInterval={100}
              data-testid="price-input"
              required
            />
          </Grid.Col>
        </Grid>

        <Textarea
          radius="md"
          autosize
          minRows={4}
          maxRows={4}
          label={
            <>
              <Group gap={5} align="center">
                <Text fz="sm" fw={500}>
                  Item Description
                </Text>
                <Text fz="sm" c="dimmed">
                  (optional)
                </Text>
              </Group>
            </>
          }
          placeholder="Describe your item..."
          {...formik.getFieldProps('description')}
          mt="md"
          data-testid="description"
        />
        <Grid align="center">
          <Grid.Col span={8}>
            <TextInput
              radius="md"
              label="Phone Number"
              placeholder={user?.contact ? user.contact : 'Reach me about this item at...'}
              value={formik.values.contact}
              mt="md"
              data-testid="contact"
              onChange={(e) => handleContactChange(e, formik.setFieldValue)}
              maxLength={14}
              required
            />
          </Grid.Col>
        </Grid>

        <Select
          radius="md"
          label="Visibility"
          placeholder="Choose visibility"
          data={[
            { value: Visibility.PUBLIC, label: 'Public' },
            { value: Visibility.FRIENDS_ONLY, label: 'Friends Only' },
          ]}
          value={formik.values.visibility}
          onChange={(value) => formik.setFieldValue('visibility', value)}
          mt="md"
          data-testid="visibility"
          comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 400 } }}
        />

        <Box w={400} h={300}>
          <Group gap={5} align="center" mt="lg">
            <Text fz="sm" fw={500}>
              Item Photo
            </Text>
            <Text size="sm" c="dimmed">
              (optional)
            </Text>
            <ActionIcon
              color="red"
              radius="md"
              variant="subtle"
              size={16}
              onClick={handleRemoveImage}
              disabled={previews.length === 0}
              ml={5}
              data-testid="remove-image"
            >
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </ActionIcon>
          </Group>
          {previews.length === 0 ? (
            <Dropzone
              onDrop={handleDropImage}
              onReject={(rejected) => console.log('rejected files', rejected)}
              maxSize={5 * 1024 ** 2}
              maxFiles={1}
              accept={IMAGE_MIME_TYPE}
              radius="md"
              mt={5}
              data-testid="dropzone"
            >
              <Stack
                align="center"
                justify="center"
                style={{ minHeight: 220, pointerEvents: 'none' }}
              >
                <Dropzone.Accept>
                  <FontAwesomeIcon
                    icon={faCloudUpload}
                    size="3x"
                    color="var(--mantine-color-blue-6)"
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <FontAwesomeIcon icon={faXmark} size="3x" color="var(--mantine-color-red-6)" />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <FontAwesomeIcon icon={faImage} size="3x" color="var(--mantine-color-dimmed)" />
                </Dropzone.Idle>
                <div>
                  <Text ta="center" size="md">
                    Drag here or click to select file
                  </Text>
                  <Text ta="center" size="xs" c="dimmed" mt={7}>
                    File should not exceed 5MB
                  </Text>
                </div>
              </Stack>
            </Dropzone>
          ) : (
            <>{previews}</>
          )}
        </Box>

        <Group justify="center" mt="md">
          <Button
            radius="md"
            type="button"
            data-testid="submit-button"
            onClick={() => {
              formik.validateForm().then((errors) => {
                if (Object.keys(errors).length === 0 && !loading) {
                  formik.submitForm();
                } else {
                  notifications.show({
                    radius: 'md',
                    color: 'red',
                    title: 'Oops!',
                    message:
                      "Couldn't create your listing, please check your inputs and try again.",
                  });
                }
              });
            }}
            loading={loading}
          >
            Post Item
          </Button>
        </Group>
      </form>
    </Drawer>
  );
}
