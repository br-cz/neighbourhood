'use client';

import { SimpleGrid, Tabs } from '@mantine/core';
import { UserListItem } from '../UserListItem/UserListItem';
import classes from './UserList.module.css';

//placeholder data
const users = {
  1: {
    name: 'Demessie Amede',
    username: 'damede',
    profilePic: 'https://avatar.iran.liara.run/public/19',
  },
  2: {
    name: 'Gurman Toor',
    username: 'gtoor',
    profilePic: 'https://avatar.iran.liara.run/public/3',
  },
  3: {
    name: 'Bricz Cruz',
    username: 'bcruz',
    profilePic: 'https://avatar.iran.liara.run/public/15',
  },
  4: {
    name: 'Safran Bin Kader',
    username: 'sbkader',
    profilePic: 'https://avatar.iran.liara.run/public/10',
  },
  5: {
    name: 'Alborz Khakbazan',
    username: 'alborzk',
    profilePic: 'https://avatar.iran.liara.run/public/5',
  },
};

const friends = {
  1: {
    name: 'Bricz Cruz',
    username: 'bcruz',
    profilePic: 'https://avatar.iran.liara.run/public/15',
  },
  2: {
    name: 'Safran Bin Kader',
    username: 'sbkader',
    profilePic: 'https://avatar.iran.liara.run/public/10',
  },
};

export function UserList() {
  return (
    <Tabs variant="outline" radius="md" defaultValue="all">
      <Tabs.List>
        <Tabs.Tab value="all">All</Tabs.Tab>
        <Tabs.Tab value="friends">Friends</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="all">
        <SimpleGrid cols={1} spacing="xs" mt="sm" className={classes.list}>
          {Object.entries(users).map(([id, user]) => (
            <UserListItem key={id} user={user} />
          ))}
        </SimpleGrid>
      </Tabs.Panel>
      <Tabs.Panel value="friends">
        <SimpleGrid cols={1} spacing="xs" mt="sm" className={classes.list}>
          {Object.entries(friends).map(([id, friend]) => (
            <UserListItem key={id} user={friend} />
          ))}
        </SimpleGrid>
      </Tabs.Panel>
    </Tabs>
  );
}
