import React, { useEffect, useState } from 'react';
import { Group, Avatar, Text, Box, Skeleton } from '@mantine/core';
import classes from './CommunityListItem.module.css';
import { Community } from '@/src/API';
import { retrieveImage } from '../../utils/s3Helpers/CommunityImageS3Helper';

interface CommunityListItemProps {
  community: Community;
  onSelect: () => void;
  selected: boolean;
  isAnyCommunitySelected: boolean;
}

export function CommunityListItem({
  community,
  onSelect,
  selected,
  isAnyCommunitySelected,
}: CommunityListItemProps) {
  const [communityImage, setCommunityImage] = useState<string>('');

  useEffect(() => {
    if (!community) return;
    retrieveImage(community?.id).then((image) => {
      if (!image) {
        setCommunityImage(
          `https://api.dicebear.com/8.x/initials/svg?seed=${community.name.toUpperCase()}&scale=60&fontFamily=Helvetica,sans-serif&fontWeight=500`
        );
      } else {
        setCommunityImage(image);
      }
    });
  }, [community?.image]);

  const itemStyle = {
    opacity: !isAnyCommunitySelected || selected ? 1 : 0.5,
    color: !isAnyCommunitySelected || selected ? 'inherit' : '#b0b0b0',
  };

  return communityImage ? (
    <Box
      className={`${classes.community} ${selected ? classes.active : ''}`}
      onKeyDown={onSelect}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      w={400}
      data-testid={`communities-item-${community.id}`}
    >
      <Group>
        <Avatar
          src={communityImage || './img/placeholder-img.jpg'}
          size="lg"
          radius="xl"
          style={{ opacity: itemStyle.opacity }}
        />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600} style={{ color: itemStyle.color }}>
            {community.name}
          </Text>
          <Text size="xs" style={{ color: itemStyle.color }}>
            {community.location}
          </Text>
        </div>
      </Group>
    </Box>
  ) : (
    <Skeleton height={100} width={400} />
  );
}
