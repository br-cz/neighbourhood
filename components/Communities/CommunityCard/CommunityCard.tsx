import React from 'react';
import { Avatar, Text, Stack, Button, Grid, Group, Box, Tooltip } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Community, User } from '@/src/API';
import classes from './CommunityCard.module.css';

interface CommunityCardProps {
  community: Community;
  isSelected: boolean;
  currentUser: User;
  onSelect: () => void;
  onLeave: () => void;
  disableLeaveButton: boolean;
}

export default function CommunityCard({
  community,
  isSelected,
  currentUser,
  onSelect,
  onLeave,
  disableLeaveButton,
}: CommunityCardProps) {
  const currentUserFriendsIds = currentUser?.friends ?? [];
  const friendsInCommunity = currentUserFriendsIds.filter((friendId: string) =>
    community?.members?.items.some((member) => member?.userId === friendId)
  );
  const numberOfFriendsInCommunity = friendsInCommunity.length;
  const activeMembersCount =
    community?.members?.items?.filter((member) => !member?._deleted).length ?? 0;

  return (
    <Box w={800} className={classes.card} data-testid="community-card">
      <Grid>
        <Grid.Col span={8}>
          <Group gap={50} align="center">
            <Box w={100} h={100}>
              <Avatar
                src={community?.image ?? './img/placeholder-img.jpg'}
                className={classes.avatar}
                radius="xl"
              />
            </Box>
            <Stack gap={5}>
              <Text size="lg" fw={600} truncate="end">
                {community?.name}
              </Text>
              <Text c="dimmed" size="md">
                Members: {activeMembersCount}
              </Text>
              <Text c="dimmed" size="md">
                Friends: {numberOfFriendsInCommunity}
              </Text>
            </Stack>
          </Group>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack mt={60} mr="xl">
            <Grid>
              <Grid.Col span={7}>
                <Button
                  fullWidth
                  size="sm"
                  variant={isSelected ? 'outline' : 'filled'}
                  onClick={() => {
                    onSelect();
                  }}
                  leftSection={isSelected ? <FontAwesomeIcon icon={faCheck} /> : null}
                  data-testid="select-community-btn"
                >
                  {isSelected ? 'Selected' : 'Select'}
                </Button>
              </Grid.Col>
              <Grid.Col span={5}>
                <Tooltip
                  label="You can't leave your only community!"
                  disabled={!disableLeaveButton}
                >
                  <Button
                    fullWidth
                    size="sm"
                    variant="filled"
                    color="red"
                    disabled={disableLeaveButton || !currentUser}
                    onClick={onLeave}
                    data-testid="leave-community-btn"
                  >
                    Leave
                  </Button>
                </Tooltip>
              </Grid.Col>
            </Grid>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
