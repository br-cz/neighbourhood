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
  const itemImage = item.images?.[0] || './img/placeholder-img.jpg';
  const profilePic = item.seller?.profilePic || './img/placeholder-profile.jpg';

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title order={2} component="p" data-testid="listing-modal-title">
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
            src={itemImage ?? './img/placeholder-img.jpg'}
            alt={item?.title}
            className={classes.image}
          />
        </Group>

        {item.description && (
          <div>
            <Title order={6}>Description</Title>
            <Text fz="sm" data-testid="listing-modal-description">
              {item?.description}
            </Text>
          </div>
        )}

        <Title order={6}>Seller</Title>
        <Group gap="xs" align="center">
          <Avatar src={profilePic} alt={item.seller.firstName} radius="xl" />
          <Text size="sm" c="dimmed" data-testid="listing-modal-seller">
            {item.seller.firstName} {item.seller.lastName}
          </Text>
        </Group>
        <Group gap="lg" mt="xs">
          <div>
            <Title order={6}>Price</Title>
            <Text fz="sm" data-testid="listing-modal-price">
              {item?.price > 0 ? `$${item?.price}` : 'FREE'}
            </Text>
          </div>
          <div>
            <Title order={6}>If Interested, Contact</Title>
            <Text fz="sm" data-testid="listing-modal-contact">
              {item?.contact}
            </Text>
          </div>
        </Group>
      </Stack>
    </Modal>
  );
}
