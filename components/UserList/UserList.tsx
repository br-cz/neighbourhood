'use client';

import { SimpleGrid, Tabs, Indicator } from '@mantine/core';
import { UserListItem } from '../UserListItem/UserListItem';
import classes from './UserList.module.css';

// placeholder data
const users = {
  1: {
    name: 'Demessie Amede',
    username: 'damede',
    profilePic: 'https://avatar.iran.liara.run/public/19',
    relationshipStatus: 'incoming',
  },
  2: {
    name: 'Gurman Toor',
    username: 'gtoor',
    profilePic: 'https://avatar.iran.liara.run/public/3',
    relationshipStatus: 'none',
  },
  3: {
    name: 'Bricz Cruz',
    username: 'bcruz',
    profilePic: 'https://avatar.iran.liara.run/public/15',
    relationshipStatus: 'friend',
  },
  4: {
    name: 'Safran Bin Kader',
    username: 'sbkader',
    profilePic: 'https://avatar.iran.liara.run/public/10',
    relationshipStatus: 'none',
  },
  5: {
    name: 'Alborz Khakbazan',
    username: 'alborzk',
    profilePic: 'https://avatar.iran.liara.run/public/5',
    relationshipStatus: 'none',
  },
};

// Use this function to determine the relationship status of a single user, or alternatively construct arrays as seen below.
// Delete if unnecessary.
function determineRelationshipStatus(currentUser, userToCheck) {
  // Logic here to check user against friends list, incoming, and outgoing requests
  // Friends if user to check is in current users friends list
  // Incoming if user to check is in current users friend request list as a sender
  // Outgoing if user to check is in current users friend request list as a receiver
  // None if user is not in any of the above lists
}

export function UserList() {
  // Convert users object to array for easier manipulation
  const allUsers = Object.entries(users).map(([id, user]) => ({
    ...user,
    id,
  }));

  // Filter users based on their relationshipStatus
  const incomingRequests = allUsers.filter((user) => user.relationshipStatus === 'incoming');
  const friends = allUsers.filter((user) => user.relationshipStatus === 'friend');
  const outgoingRequests = allUsers.filter((user) => user.relationshipStatus === 'outgoing');
  const nonFriends = allUsers.filter((user) => user.relationshipStatus === 'none');

  const numRequests = incomingRequests.length;
  return (
    <Tabs variant="outline" radius="md" defaultValue="all">
      <Tabs.List>
        <Tabs.Tab value="all">All</Tabs.Tab>
        <Tabs.Tab value="friends">Friends</Tabs.Tab>
        {numRequests > 0 ? (
          <Indicator size="md" inline label={numRequests} color="blue">
            <Tabs.Tab value="requests">Requests</Tabs.Tab>
          </Indicator>
        ) : (
          <Tabs.Tab value="requests">Requests</Tabs.Tab>
        )}
      </Tabs.List>
      <Tabs.Panel value="all">
        <SimpleGrid cols={1} spacing="xs" mt="sm" className={classes.list}>
          {incomingRequests.map((user) => (
            <UserListItem key={user.id} user={user} relationshipStatus={user.relationshipStatus} />
          ))}
          {friends.map((user) => (
            <UserListItem key={user.id} user={user} relationshipStatus={user.relationshipStatus} />
          ))}
          {outgoingRequests.map((user) => (
            <UserListItem key={user.id} user={user} relationshipStatus={user.relationshipStatus} />
          ))}
          {nonFriends.map((user) => (
            <UserListItem key={user.id} user={user} relationshipStatus={user.relationshipStatus} />
          ))}
        </SimpleGrid>
      </Tabs.Panel>
      <Tabs.Panel value="friends">
        <SimpleGrid cols={1} spacing="xs" mt="sm" className={classes.list}>
          {friends.map((user) => (
            <UserListItem key={user.id} user={user} relationshipStatus={user.relationshipStatus} />
          ))}
        </SimpleGrid>
      </Tabs.Panel>
      <Tabs.Panel value="requests">
        <SimpleGrid cols={1} spacing="xs" mt="sm" className={classes.list}>
          {incomingRequests.map((user) => (
            <UserListItem key={user.id} user={user} relationshipStatus={user.relationshipStatus} />
          ))}
        </SimpleGrid>
      </Tabs.Panel>
    </Tabs>
  );
}
