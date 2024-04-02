import React, { useState, useEffect } from 'react';
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Center,
  Avatar,
  Title,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBookmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import classes from './MarketplaceCard.module.css';
import { ItemForSale } from '@/types/types';
import { useDeleteListing, useListingSaves } from '@/src/hooks/marketplaceCustomHooks';

interface MarketplaceCardProps {
  item: ItemForSale;
  isSaved?: boolean;
  isSeller?: boolean;
  onView: () => void;
  onUpdate?: () => void;
}

export function MarketplaceCard({
  item,
  isSaved,
  isSeller,
  onView,
  onUpdate,
}: MarketplaceCardProps) {
  const itemImage = item.images?.[0] || './img/placeholder-img.jpg';
  const profilePic = item.seller?.profilePic || './img/placeholder-profile.jpg';
  const { handleDeleteListing } = useDeleteListing();
  const { saveListing, unsaveListing } = useListingSaves(item.id);
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(item.saveCount || 0);

  useEffect(() => {
    setSaved(isSaved!);
  }, [isSaved]);

  const handleDelete = () => {
    handleDeleteListing(item);
    onUpdate?.();
  };

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: (
        <Title order={5} component="p">
          Delete listing?
        </Title>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to delete your listing? This action cannot be undone.
        </Text>
      ),
      confirmProps: { size: 'xs', radius: 'md', color: 'red.6' },
      cancelProps: { size: 'xs', radius: 'md' },
      labels: { confirm: 'Delete', cancel: 'Back' },
      onConfirm: () => handleDelete(),
    });
  };

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

      <Group gap={6} align="center">
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
        {isSeller && (
          <Tooltip label="Delete listing">
            <ActionIcon
              color="red.7"
              radius="xl"
              variant="subtle"
              size="sm"
              className={classes.title}
              onClick={openDeleteModal}
              data-testid="delete-listing-btn"
            >
              <FontAwesomeIcon icon={faTrash} size="xs" />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>

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
          <Button
            radius="md"
            size="compact-sm"
            variant={saved || isSaved ? 'outline' : 'filled'}
            leftSection={<FontAwesomeIcon icon={faBookmark} />}
            onClick={handleSave}
            data-testid="listing-save-button"
          >
            {saved || isSaved ? 'Saved' : 'Save'}
          </Button>
        </Group>
      </Group>
    </Card>
  );
}
