import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Button, Group, Center, Avatar } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import classes from './MarketplaceCard.module.css';
import { ItemForSale } from '@/types/types';
import { retrieveImage as retrieveProfilePicture } from '../utils/s3Helpers/UserProfilePictureS3Helper';
import { retrieveImage as retrieveItemImage } from '../utils/s3Helpers/ItemForSaleImageS3Helper';

interface MarketplaceCardProps {
  item: ItemForSale;
  onView: () => void;
}

export function MarketplaceCard({ item, onView }: MarketplaceCardProps) {
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
    <Card withBorder radius="md" className={classes.card} data-testid="marketplace-card">
      <a>
        <Image
          src={itemImage ?? './img/placeholder-img.jpg'}
          height={180}
          className={classes.image}
        />
      </a>

      <Text
        className={classes.title}
        fw={700}
        c="dark.6"
        fz="lg"
        component="a"
        truncate="end"
        data-testid="listing-title"
      >
        {item?.title}
      </Text>

      <Text
        className={classes.price}
        fw={500}
        fz="md"
        mt={0}
        component="a"
        data-testid="listing-price"
      >
        {item?.price > 0 ? `$${item?.price}` : 'FREE'}
      </Text>

      <Group>
        <Center>
          <Avatar src={profilePic} size={23} radius="xl" mr={7} />
          <Text fz="sm" c="dimmed" truncate="end" data-testid="seller">
            {item?.seller?.firstName} {item?.seller?.lastName}
          </Text>
        </Center>
      </Group>

      <Text className={classes.details} c="dark.6" fz="sm" truncate="end" data-testid="description">
        {item?.description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Group gap={8} mr={0}>
          <Button
            radius="md"
            size="compact-sm"
            leftSection={<FontAwesomeIcon icon={faBars} />}
            variant="filled"
            onClick={onView}
            data-testid="view-button"
          >
            View
          </Button>
        </Group>
      </Group>
    </Card>
  );
}
