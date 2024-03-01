import React from 'react';
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
  Checkbox,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useFormik } from 'formik';
import { Visibility } from '@/src/API';

interface CreateListingDrawerProps {
  opened: boolean;
  onClose: () => void;
  onPostCreated: () => void;
}

export function CreateListingDrawer({ opened, onClose, onPostCreated }: CreateListingDrawerProps) {
  const [loading, handlers] = useDisclosure();
  //   const { handleCreateListing } = useCreateListing();

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      description: '',
      contact: '',
      visibility: Visibility.PUBLIC,
    },
    // validationSchema: createEventSchema,
    onSubmit: async (parameters) => {
      handlers.open();
      const listingData = {
        title: parameters.title,
        price: parameters.price,
        description: parameters.description,
        contact: parameters.contact,
        visibility: parameters.visibility,
      };

      //   await handleCreateListing(listingData);
      onPostCreated();
      handlers.close();
      onClose();
      formik.resetForm();
    },
  });

  return (
    <Drawer
      offset={8}
      radius="md"
      opened={opened}
      onClose={() => {
        formik.resetForm();
        onClose();
      }}
      position="right"
      title={
        <Title order={3} component="p">
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

        {/* Autofill contact as user's phone number if available */}
        <Grid align="center">
          <Grid.Col span={8}>
            <TextInput
              radius="md"
              label="Phone Number"
              placeholder="Reach me about this item at..."
              {...formik.getFieldProps('contact')}
              mt="md"
              data-testid="contact"
            />
          </Grid.Col>
          {/* Potential idea, can remove */}
          {/* <Grid.Col span={2}>
            <Checkbox label="Text" radius="md" mt="xl" />
          </Grid.Col>
          <Grid.Col span={2}>
            <Checkbox label="Call" radius="md" mt="xl" />
          </Grid.Col> */}
        </Grid>

        <Select
          radius="md"
          label="Visibility"
          placeholder="Choose visibility"
          data={[{ value: Visibility.PUBLIC, label: 'Public' }]}
          {...formik.getFieldProps('visibility')}
          mt="md"
          data-testid="visibility"
          comboboxProps={{ transitionProps: { transition: 'scale-y', duration: 400 } }}
        />

        <Group justify="center" mt="lg">
          <Button
            radius="md"
            type="button"
            data-testid="submit button"
            onClick={() => {
              formik.validateForm().then((errors) => {
                if (Object.keys(errors).length === 0 && !loading) {
                  formik.submitForm();
                  notifications.show({
                    radius: 'md',
                    color: 'yellow.6',
                    title: 'Cha-ching!',
                    message: 'Your item is now up for sale and visible to your neighbours.',
                  });
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
