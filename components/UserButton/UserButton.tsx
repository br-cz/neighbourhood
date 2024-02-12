import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';

export function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar
          src="https://media.tenor.com/4pL2t5DNPCUAAAAe/drake-drake-meme.png"
          size="md"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={600}>
            My Profile
          </Text>

          <Text c="dimmed" size="xs">
            agraham@gmail.com
          </Text>
        </div>

        <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
