'use client';

import { SimpleGrid, Tabs, Indicator, Loader, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { UserListItem } from '../UserListItem/UserListItem';
import classes from './UserList.module.css';
import { useFetchCommunityMembers } from '@/src/hooks/friendsCustomHooks';
import { sortByNewToOld, sortByFirstName, sortByLastName } from '@/src/utils/sortUtils';
import { User } from '@/src/types/types';

interface UserListProps {
  searchQuery: string;
  sortQuery: string | null;
}

export function UserList({ searchQuery, sortQuery }: UserListProps) {
  // Stores sorted and filtered lists of users
  const [incomingRequests, setIncomingRequests] = useState<any>([]);
  const [friends, setFriends] = useState<any>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<any>([]);
  const [noRelationshipFriends, setNoRelationshipFriends] = useState<any>([]);
  // Fetches raw lists of users
  const {
    friends: userFriends,
    incomingFriendRequests,
    outgoingFriendRequests,
    noneFriends,
    refetch,
    loading,
  } = useFetchCommunityMembers();

  const numRequests = incomingFriendRequests.length;

  function matchesSearchQuery(user: any, query: string): boolean {
    return (
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
      user?.username?.toLowerCase().includes(query.toLowerCase()) ||
      user?.bio?.toLowerCase().includes(query.toLowerCase())
    );
  }

  const applyFilterAndSort = (users: any[], sortFunction: { (a: any, b: any): number }) =>
    users.filter((user: User) => matchesSearchQuery(user, searchQuery)).sort(sortFunction);

  const getSortFunction = () => {
    switch (sortQuery) {
      case 'First Name (A-Z)':
        return sortByFirstName;
      case 'Last Name (A-Z)':
        return sortByLastName;
      case 'Recently Joined':
        return sortByNewToOld;
      default:
        return () => 0;
    }
  };

  useEffect(() => {
    const sortFunction = getSortFunction();
    setFriends(applyFilterAndSort(userFriends, sortFunction));
    setIncomingRequests(applyFilterAndSort(incomingFriendRequests, sortFunction));
    setOutgoingRequests(applyFilterAndSort(outgoingFriendRequests, sortFunction));
    setNoRelationshipFriends(applyFilterAndSort(noneFriends, sortFunction));
  }, [
    searchQuery,
    sortQuery,
    incomingFriendRequests,
    userFriends,
    outgoingFriendRequests,
    noneFriends,
  ]);

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
        ) : incomingRequests.length === 0 &&
          friends.length === 0 &&
          outgoingRequests.length === 0 &&
          noRelationshipFriends.length === 0 ? (
          <Group justify="center" mt="200">
            <Text c="dimmed">No users found</Text>
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
        {friends.length === 0 ? (
          <Group justify="center" mt="200">
            <Text c="dimmed">No friends found</Text>
          </Group>
        ) : (
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
        )}
      </Tabs.Panel>
      <Tabs.Panel value="requests">
        {numRequests === 0 ? (
          <Group justify="center" mt="200">
            <Text c="dimmed">No requests found</Text>
          </Group>
        ) : (
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
        )}
      </Tabs.Panel>
    </Tabs>
  );
}
