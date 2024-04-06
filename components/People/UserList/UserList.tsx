'use client';

import { SimpleGrid, Tabs, Indicator, Loader, Group, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { UserListItem } from '../UserListItem/UserListItem';
import classes from './UserList.module.css';
import { sortByNewToOld, sortByFirstName, sortByLastName } from '@/utils/sortUtils';
import { User } from '@/types/types';

interface UserListProps {
  friends: User[];
  incomingFriendRequests: User[];
  outgoingFriendRequests: User[];
  noneFriends: User[];
  searchQuery: string;
  sortQuery: string | null;
}

export function UserList({
  friends: userFriends,
  incomingFriendRequests,
  outgoingFriendRequests,
  noneFriends,
  searchQuery,
  sortQuery,
}: UserListProps) {
  const [friends, setFriends] = useState<any>(userFriends);
  const [incomingRequests, setIncomingRequests] = useState<any>(incomingFriendRequests);
  const [outgoingRequests, setOutgoingRequests] = useState<any>(outgoingFriendRequests);
  const [noRelationshipFriends, setNoRelationshipFriends] = useState<any>(noneFriends);
  const numRequests = incomingRequests.length;

  interface StatusMap {
    [userId: string]: string;
  }

  const [statusMap, setStatusMap] = useState<StatusMap>({});

  const handleStatusUpdate = (userId: string, newStatus: string) => {
    console.log(`Received newStatus: ${newStatus}`);

    if (newStatus === 'friend') {
      console.log('Inside friend condition');
      const userToAdd = incomingRequests.find((user: User) => user.id === userId);
      if (userToAdd) {
        setIncomingRequests((current: any) => current.filter((user: User) => user.id !== userId));
        setFriends((current: any) => [...current, userToAdd]);
      }
    } else if (newStatus === 'cancel') {
      console.log('Inside cancel condition');
      setNoRelationshipFriends((current: any) => [
        ...current,
        outgoingRequests.find((user: User) => user.id === userId),
      ]);
      setOutgoingRequests((current: any) => current.filter((user: User) => user.id !== userId));
    } else if (newStatus === 'remove') {
      console.log('Inside remove condition');
      setNoRelationshipFriends((current: any) => [
        ...current,
        friends.find((user: User) => user.id === userId),
      ]);
      setFriends((current: any) => current.filter((user: User) => user.id !== userId));
    } else if (newStatus === 'decline') {
      console.log('Inside decline condition');
      setNoRelationshipFriends((current: any) => [
        ...current,
        incomingRequests.find((user: User) => user.id === userId),
      ]);
      setIncomingRequests((current: any) => current.filter((user: User) => user.id !== userId));
    }

    if (newStatus === 'cancel' || newStatus === 'remove' || newStatus === 'decline') {
      console.log('Inside cancel, remove, or decline condition');
      setStatusMap((prev) => ({ ...prev, [userId]: 'none' }));
    } else {
      console.log('Inside other condition');
      setStatusMap((prev) => ({ ...prev, [userId]: newStatus }));
    }
  };

  function matchesSearchQuery(user: any, query: string): boolean {
    return (
      `${user?.firstName} ${user?.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
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
    setFriends(applyFilterAndSort(friends, sortFunction));
    setIncomingRequests(applyFilterAndSort(incomingRequests, sortFunction));
    setOutgoingRequests(applyFilterAndSort(outgoingRequests, sortFunction));
    setNoRelationshipFriends(applyFilterAndSort(noRelationshipFriends, sortFunction));
  }, [searchQuery, sortQuery, statusMap]);

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
        {incomingRequests.length === 0 &&
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
                key={user?.id}
                user={user}
                relationshipStatus={statusMap[user?.id] || 'incoming'}
                onChange={(newStatus: string) => {
                  handleStatusUpdate(user.id, newStatus);
                }}
              />
            ))}
            {friends &&
              friends.map((user: any) => (
                <UserListItem
                  key={user?.id}
                  user={user}
                  relationshipStatus={statusMap[user?.id] || 'friend'}
                  onChange={(newStatus: string) => {
                    handleStatusUpdate(user.id, newStatus);
                  }}
                />
              ))}
            {outgoingRequests.map((user: any) => (
              <UserListItem
                key={user?.id}
                user={user}
                relationshipStatus={statusMap[user?.id] || 'outgoing'}
                onChange={(newStatus: string) => {
                  handleStatusUpdate(user.id, newStatus);
                }}
              />
            ))}
            {noRelationshipFriends.map((user: any) => (
              <UserListItem
                key={user?.id}
                user={user}
                relationshipStatus={statusMap[user?.id] || 'none'}
                onChange={(newStatus: string) => {
                  handleStatusUpdate(user.id, newStatus);
                }}
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
                  key={user?.id}
                  user={user}
                  relationshipStatus={statusMap[user?.id] || 'friend'}
                  onChange={(newStatus: string) => {
                    handleStatusUpdate(user.id, newStatus);
                  }}
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
                key={user?.id}
                user={user}
                relationshipStatus={statusMap[user?.id] || 'incoming'}
                onChange={(newStatus: string) => {
                  handleStatusUpdate(user.id, newStatus);
                }}
              />
            ))}
          </SimpleGrid>
        )}
      </Tabs.Panel>
    </Tabs>
  );
}
