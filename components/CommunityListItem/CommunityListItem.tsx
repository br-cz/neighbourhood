import React from 'react';
import { Group, Avatar, Text } from '@mantine/core';
import classes from './CommunityListItem.module.css';
import { Community } from '@/types/types';

interface CommunityListItemProps {
  community: Community;
  onSelect: () => void;
  isSelected: boolean;
}

export function CommunityListItem({ community, onSelect, isSelected }: CommunityListItemProps) {
  return (
    <div
      className={`${classes.community} ${isSelected ? classes.active : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      data-testid="communities-item"
    >
      <Group>
        <Avatar src={community.image} size="lg" radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600}>
            {community.name}
          </Text>
          <Text color="dimmed" size="xs">
            {community.location}
          </Text>
        </div>
      </Group>
    </div>
  );
}
