'use client';

import { SimpleGrid, Tabs, Indicator, Loader, Group } from '@mantine/core';
import { UserListItem } from '../UserListItem/UserListItem';
import classes from './UserList.module.css';
import { useFetchCommunityMembers } from '@/src/api/friendQueries';

export function UserList() {
  const {
    friends: userFriends,
    incomingFriendRequests,
    outgoingFriendRequests,
    noneFriends,
    refetch,
    loading,
  } = useFetchCommunityMembers();

  // Filter users based on their relationshipStatus
  const friends = userFriends;
  const incomingRequests = incomingFriendRequests;
  const outgoingRequests = outgoingFriendRequests;
  const noRelationshipFriends = noneFriends;
  const numRequests = incomingRequests.length;

  return (
    <Tabs variant="outline" radius="md" defaultValue="all" data-testid="user-list">
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
        {loading ? (
          <Group justify="center" mt="200">
            <Loader />
          </Group>
        ) : (
          <SimpleGrid cols={1} spacing="xs" mt="sm" className={classes.list}>
            {incomingRequests.map((user: any) => (
              //Refactor status into Enum
              <UserListItem
                key={user.id}
                user={user}
                relationshipStatus="incoming"
                onUpdate={refetch}
              />
            ))}
            {friends &&
              friends.map((user: any) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  relationshipStatus="friend"
                  onUpdate={refetch}
                />
              ))}
            {outgoingRequests.map((user: any) => (
              <UserListItem
                key={user.id}
                user={user}
                relationshipStatus="outgoing"
                onUpdate={refetch}
              />
            ))}
            {noRelationshipFriends.map((user: any) => (
              <UserListItem
                key={user.id}
                user={user}
                relationshipStatus="none"
                onUpdate={refetch}
              />
            ))}
          </SimpleGrid>
        )}
      </Tabs.Panel>
      <Tabs.Panel value="friends">
        <SimpleGrid cols={1} spacing="xs" mt="sm" className={classes.list}>
          {friends &&
            friends.map((user: any) => (
              <UserListItem
                key={user.id}
                user={user}
                relationshipStatus="friend"
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
              relationshipStatus="incoming"
              onUpdate={refetch}
            />
          ))}
        </SimpleGrid>
      </Tabs.Panel>
    </Tabs>
  );
}
