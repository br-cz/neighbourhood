import React, { useEffect, useState } from 'react';
import { Modal, Text, Group, Avatar, Image, Stack, Title } from '@mantine/core';
import classes from './ViewListingModal.module.css';
import { ItemForSale } from '@/src/API';
import { retrieveImage as retrieveProfilePicture } from '../utils/s3Helpers/UserProfilePictureS3Helper';
import { retrieveImage as retrieveItemImage } from '../utils/s3Helpers/ItemForSaleImageS3Helper';

interface ViewListingModalProps {
  opened: boolean;
  onClose: () => void;
  item: ItemForSale;
}

export function ViewListingModal({ opened, onClose, item }: ViewListingModalProps) {
  const [profilePic, setProfilePic] = useState<string>('');
  const [itemImage, setItemImage] = useState<string>('');

  useEffect(() => {
    if (!item?.seller) return;
    retrieveProfilePicture(item?.seller?.id).then((image) => {
      setProfilePic(image);
    });
  }, [item?.seller?.profilePic]);

  useEffect(() => {
    if (!item) return;
    retrieveItemImage(item.id).then((image) => {
      setItemImage(image);
    });
  }, [item?.images]);

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
            src={itemImage ?? './img/placeholder-img.jpg'}
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
          <Avatar src={profilePic} alt={item.seller.firstName} radius="xl" />
          <Text size="sm" c="dimmed">
            {item.seller.firstName} {item.seller.lastName}
          </Text>
        </Group>
        <Group gap="lg" mt="xs">
          <div>
            <Title order={6}>Price</Title>
            <Text fz="sm">${item?.price}</Text>
          </div>
          <div>
            <Title order={6}>If Interested, Contact</Title>
            <Text fz="sm">{item?.contact}</Text>
          </div>
        </Group>
      </Stack>
    </Modal>
  );
}
