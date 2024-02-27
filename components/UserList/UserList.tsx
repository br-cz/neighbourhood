'use client';

import { SimpleGrid, Tabs, Indicator } from '@mantine/core';
import { UserListItem } from '../UserListItem/UserListItem';
import classes from './UserList.module.css';
import { useFetchCommunityMembers } from '@/src/hooks/friendsCustomHooks';

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
    id: '8c3df5c8-80a1-700b-31cb-a53cac4e67bf',
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

export function UserList() {
  const {
    friends: userFriends,
    incomingFriendRequests,
    outgoingFriendRequests,
    noneFriends,
    refetch,
  } = useFetchCommunityMembers();

  //temp function for onUpdate remove when no longer needed!
  const doNothing = () => {
    console.log('oo nothing');
  };

  // Filter users based on their relationshipStatus
  const friends = userFriends;
  const incomingRequests = incomingFriendRequests;
  const outgoingRequests = outgoingFriendRequests;
  const noRelationshipFriends = noneFriends;

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
          {incomingRequests.map((user: any) => (
            //have some enum for status
            <UserListItem
              key={user.id}
              user={user}
              relationshipStatus={'incoming'}
              onUpdate={refetch}
            />
          ))}
          {friends &&
            friends.map((user: any) => (
              <UserListItem
                key={user.id}
                user={user}
                relationshipStatus={'friend'}
                onUpdate={refetch}
              />
            ))}
          {outgoingRequests.map((user: any) => (
            <UserListItem
              key={user.id}
              user={user}
              relationshipStatus={'outgoing'}
              onUpdate={refetch}
            />
          ))}
          {noRelationshipFriends.map((user: any) => (
            <UserListItem
              key={user.id}
              user={user}
              relationshipStatus={'none'}
              onUpdate={refetch}
            />
          ))}
        </SimpleGrid>
      </Tabs.Panel>
      <Tabs.Panel value="friends">
        <SimpleGrid cols={1} spacing="xs" mt="sm" className={classes.list}>
          {friends &&
            friends.map((user: any) => (
              <UserListItem
                key={user.id}
                user={user}
                relationshipStatus={'friend'}
                onUpdate={refetch}
              />
            ))}
        </SimpleGrid>
      </Tabs.Panel>
      <Tabs.Panel value="requests">
        <SimpleGrid cols={1} spacing="xs" mt="sm" className={classes.list}>
          {incomingRequests.map((user: any) => (
            <UserListItem
              key={user.id}
              user={user}
              relationshipStatus={'incoming'}
              onUpdate={refetch}
            />
          ))}
        </SimpleGrid>
      </Tabs.Panel>
    </Tabs>
  );
}
