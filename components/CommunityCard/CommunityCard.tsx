import React from 'react';
import { Avatar, Text, Group, Badge } from '@mantine/core';

interface CommunityCardProps {
    name: string;
    image: string;
    members: any[];
    friends: any[];
  }
  
  export default function CommunityCard ({ name, image, members, friends }:CommunityCardProps) {
  return (
    <Group>
        <Avatar src={image} size="lg" radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600}>
            {name}
          </Text>
          <Text c="dimmed" size="xs">
            Members: {members.length}
          </Text>
          <Text c="dimmed" size="xs">
            Friends: {friends.length}
          </Text>
        </div>
      </Group>
  );
};

