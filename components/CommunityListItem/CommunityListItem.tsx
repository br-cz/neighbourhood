import React from 'react';
import { Group, Avatar, Text } from '@mantine/core';
import classes from './CommunityListItem.module.css';
import { useToggle } from '@mantine/hooks';
import { Community } from '@/types/types';

interface CommunityListItemProps {
  community: Community;
  //selected: boolean;
  onSelect: () => void;
}

export function CommunityListItem({ community, onSelect }: CommunityListItemProps) {
  const [selected, toggleSelected] = useToggle();
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
    >
      <Group>
        <Avatar src={community.image} size="lg" radius="xl" />
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
