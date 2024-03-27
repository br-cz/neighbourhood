import { useEffect, useState } from 'react';
import { UnstyledButton, Group, Avatar, Text, rem, Skeleton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarCommunityButton.module.css';
import { retrieveImage } from '../../../utils/s3Helpers/CommunityImageS3Helper';
import { useCurrentCommunity } from '@/src/hooks/communityCustomHooks';

interface NavbarCommunityButtonProps {
  active: boolean;
  setActiveTab: (tab: string) => void;
}

export function NavbarCommunityButton({ active, setActiveTab }: NavbarCommunityButtonProps) {
  const { community } = useCurrentCommunity();
  const communityImage = community?.image || './img/placeholder-img.jpg';

  return (
    <UnstyledButton
      onClick={() => setActiveTab('communities')}
      className={`${classes.community} ${active ? classes.active : ''}`}
      data-testid="community"
    >
      <Group>
        {community ? (
          <Avatar src={communityImage} size="md" radius="xl" />
        ) : (
          <Skeleton width={36} height={36} radius="xl" />
        )}

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600}>
            My Community
          </Text>

          {community ? (
            <Text c="dimmed" size="xs">
              {community?.name}
            </Text>
          ) : (
            <Skeleton mt={4} width={90} height={4} />
          )}
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
