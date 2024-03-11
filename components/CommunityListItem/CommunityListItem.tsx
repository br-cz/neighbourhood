import React, { useEffect, useState } from 'react';
import { useToggle } from '@mantine/hooks';
import { Group, Avatar, Text } from '@mantine/core';
import classes from './CommunityListItem.module.css';
import { Community } from '@/types/types';
import { retrieveImage } from '../utils/s3Helpers/CommunityImageS3Helper';

interface CommunityListItemProps {
  community: Community;
  onSelect: () => void;
}

export function CommunityListItem({ community, onSelect }: CommunityListItemProps) {
  const [selected, toggleSelected] = useToggle();
  const [communityImage, setCommunityImage] = useState<string>('');

  useEffect(() => {
    if (!community) return;
    retrieveImage(community?.id).then((image) => {
      setCommunityImage(image);
    });
  }, [community?.image]);

  return (
    <div
      className={`${classes.community} ${selected ? classes.active : ''}`}
      onClick={() => {
        onSelect();
        toggleSelected();
      }}
      onKeyDown={onSelect}
      role="button"
      tabIndex={0}
      data-testid="communities-item"
    >
      <Group>
        <Avatar src={communityImage} size="lg" radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600}>
            {community.name}
          </Text>
          <Text c="dimmed" size="xs">
            {community.location}
          </Text>
        </div>
      </Group>
    </div>
  );
}
