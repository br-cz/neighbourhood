import React from 'react';
import { Modal, Text, Group, Avatar, Image, Stack, Title } from '@mantine/core';
import classes from './ViewListingModal.module.css';
import { ItemForSale } from '@/src/API';

interface ViewListingModalProps {
  opened: boolean;
  onClose: () => void;
  item: ItemForSale;
}

export function ViewListingModal({ opened, onClose, item }: ViewListingModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title order={2} component="p">
          {item?.title}
        </Title>
      }
      size="md"
      radius="md"
      padding={30}
      transitionProps={{ transition: 'pop' }}
      data-testid="view-event-modal"
      closeButtonProps={{ 'aria-label': 'Close Modal' }}
    >
      <Stack gap="sm">
        <Group justify="center" mb={15}>
          <Image
            src={item?.images?.[0] ?? './img/placeholder-img.jpg'}
            alt={item?.title}
            className={classes.image}
          />
        </Group>

        {item.description && (
          <div>
            <Title order={6}>Description</Title>
            <Text fz="sm">{item?.description}</Text>
          </div>
        )}

        <Title order={6}>Seller</Title>
        <Group gap="xs" align="center">
          <Avatar src={item?.seller.profilePic} alt={item.seller.firstName} radius="xl" />
          <Text size="sm" c="dimmed">
            {item.seller.firstName} {item.seller.lastName}
          </Text>
        </Group>
        <Group gap={25} mt="xs">
          <div>
            <Title order={6}>Contact</Title>
            <Text fz="sm">{item?.contact}</Text>
          </div>
        </Group>
      </Stack>
    </Modal>
  );
}
