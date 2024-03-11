import React, { useEffect, useState } from 'react';
import { useToggle } from '@mantine/hooks';
import { Group, Avatar, Text } from '@mantine/core';
import classes from './CommunityListItem.module.css';
import { Community } from '@/types/types';
import { retrieveImage } from '../utils/s3Helpers/CommunityImageS3Helper';

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
      setCommunityImage(image);
    });
  }, [community?.image]);

  const itemStyle = {
    opacity: !isAnyCommunitySelected || selected ? 1 : 0.5,
    color: !isAnyCommunitySelected || selected ? 'inherit' : '#b0b0b0',
  };

  return (
    <div
      className={`${classes.community} ${selected ? classes.active : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      data-testid={`communities-item-${community.id}`}
    >
      <Group>
        <Avatar src={communityImage} size="lg" radius="xl" style={{ opacity: itemStyle.opacity }} />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600} style={{ color: itemStyle.color }}>
            {community.name}
          </Text>
          <Text size="xs" style={{ color: itemStyle.color }}>
            {community.location}
          </Text>
        </div>
      </Group>
    </div>
  );
}
