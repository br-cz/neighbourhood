import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Button, Group, Avatar } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBookmark } from '@fortawesome/free-solid-svg-icons';
import classes from './MarketplaceCard.module.css';
import { ItemForSale } from '@/types/types';
import { useListingSaves } from '@/src/hooks/marketplaceCustomHooks';

interface MarketplaceCardProps {
  item: ItemForSale;
  onView: () => void;
  isSaved: boolean;
}

export function MarketplaceCard({ item, onView, isSaved }: MarketplaceCardProps) {
  const itemImage = item.images?.[0] || './img/placeholder-img.jpg';
  const profilePic = item.seller?.profilePic || './img/placeholder-profile.jpg';
  const { saveListing, unsaveListing } = useListingSaves(item.id);
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(item.saveCount || 0);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleSave = async () => {
    if (saved) {
      setSaveCount(saveCount! - 1);
      setSaved(false);
      await unsaveListing();
    } else {
      setSaveCount(saveCount! + 1);
      setSaved(true);
      await saveListing();
    }
  };

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

      <Group justify="flex-start" gap="0px" align="center" wrap="nowrap">
        <Avatar src={profilePic} size={23} radius="xl" mr={7} />
        <Text fz="sm" c="dimmed" truncate="end" data-testid="seller">
          {`${item?.seller?.firstName} ${item?.seller?.lastName}`}
        </Text>
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
          <Button
            radius="md"
            size="compact-sm"
            variant={saved ? 'outline' : 'filled'}
            leftSection={<FontAwesomeIcon icon={faBookmark} />}
            onClick={handleSave}
            data-testid="listing-save-button"
          >
            {saved ? 'Saved' : 'Save'}
          </Button>
        </Group>
      </Group>
    </Card>
  );
}
