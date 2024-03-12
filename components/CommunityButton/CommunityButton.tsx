import { useEffect, useState } from 'react';
import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './CommunityButton.module.css';
import { useData } from '@/contexts/DataContext';
import { retrieveImage } from '../utils/s3Helpers/CommunityImageS3Helper';
import { useCurrentCommunity } from '@/src/hooks/communityCustomHooks';

interface CommunityButtonProps {
  active: boolean;
}

export function CommunityButton({ active }: CommunityButtonProps) {
  const { community } = useCurrentCommunity();
  const [communityImage, setCommunityImage] = useState<string>('');

  useEffect(() => {
    if (!community) return;
    retrieveImage(community?.id).then((image) => {
      setCommunityImage(image);
    });
  }, [community?.image]);
  return (
    <Link href="/communities" passHref className={classes.link} data-testid="community">
      <UnstyledButton className={`${classes.community} ${active ? classes.active : ''}`}>
        <Group>
          <Avatar src={communityImage} size="md" radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={600}>
              My Community
            </Text>

            <Text c="dimmed" size="xs">
              {community?.name}
            </Text>
          </div>

          <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
        </Group>
      </UnstyledButton>
    </Link>
  );
}
