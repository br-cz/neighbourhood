import React from 'react';
import { Button } from '@mantine/core';
import {
  getCurrentUserID,
  getCurrentCommunityID,
  getUserByID,
  getCommunityByID,
  getCurrentUser,
  getCurrentCommunity,
  useCurrentUser,
  useCurrentCommunity,
} from '@/src/api/appQueries';
import { getEventByID, useFetchEvents, useCreateEvent } from '@/src/api/eventQueries';
import { useFetchMembers } from '@/src/api/memberQueries';
import { Visibility } from '@/src/API';

export const TestAllQueries = () => {
  const { user } = useCurrentUser();
  const { community } = useCurrentCommunity();
  const { events } = useFetchEvents();
  const { members } = useFetchMembers();
  const { handleCreateEvent } = useCreateEvent();

  const testEvent = {
    name: 'Yard Sale!!',
    description: 'Come check out our yard sale!',
    images: ['https://i.pinimg.com/474x/b9/c1/88/b9c188de7d5e572dd57d5e4e291df7f5.jpg'],
    location: '22 Bridge Lake Dr.',
    datetime: new Date('2023-05-12T19:00:00').toISOString(),
    visibility: Visibility.PUBLIC,
  };

  const handleButtonClick = async () => {
    console.log('Current UserID:', getCurrentUserID());
    console.log('Current CommunityID:', getCurrentCommunityID());
    console.log('Current User:', await getCurrentUser());
    console.log('Current Community:', await getCurrentCommunity());
    console.log('User by ID:', await getUserByID(getCurrentUserID()));
    console.log('Community by ID:', await getCommunityByID(getCurrentCommunityID()));
    console.log('User by useCurrentUser:', user);
    console.log('Community by useCurrentCommunity:', community);
    console.log('Events:', events);
    await handleCreateEvent(testEvent);
    console.log('Event by ID:', await getEventByID('4fa83df7-482e-402f-9eac-97ad2f220a9e'));
    console.log('Members:', members);
  };

  return <Button onClick={handleButtonClick}>Log App Queries</Button>;
};
