import React from 'react';
import { Button } from '@mantine/core';
import { getUserAPI } from '@/src/api/services/user';
import { getCommunityAPI } from '@/src/api/services/community';
import { getCurrentUserID, getCurrentUser, useCurrentUser } from '@/src/hooks/usersCustomHooks';
import { getCurrentCommunityID, getCurrentCommunity, useCurrentCommunity, useFetchMembers } from '@/src/hooks/communityCustomHooks';
import { getEventAPI } from '@/src/api/services/event';
import { useFetchEvents, useCreateEvent } from '@/src/hooks/eventsCustomHooks';
import { getPostAPI } from '@/src/api/services/post';
import { useCreatePost, useFetchPosts } from '@/src/hooks/postsCustomHooks';
import { Visibility } from '@/src/API';

export const TestAllQueries = () => {
  const { user } = useCurrentUser();
  const { community } = useCurrentCommunity();
  const { events } = useFetchEvents();
  const { members } = useFetchMembers();
  const { posts } = useFetchPosts();
  const { handleCreateEvent } = useCreateEvent();
  const { handleCreatePost } = useCreatePost();

  const testEvent = {
    name: 'Yard Sale!!',
    description: 'Come check out our yard sale!',
    images: ['https://i.pinimg.com/474x/b9/c1/88/b9c188de7d5e572dd57d5e4e291df7f5.jpg'],
    location: '22 Bridge Lake Dr.',
    datetime: new Date('2023-05-12T19:00:00').toISOString(),
    visibility: Visibility.PUBLIC,
  };

  const testPost = {
    content: 'Excited to share this moment with everyone!',
    visibility: Visibility.PUBLIC,
  };

  const handleButtonClick = async () => {
    console.log('Current UserID:', getCurrentUserID());
    console.log('Current CommunityID:', getCurrentCommunityID());
    console.log('Current User:', await getCurrentUser());
    console.log('Current Community:', await getCurrentCommunity());
    console.log('User by ID:', await getUserAPI(getCurrentUserID()));
    console.log('Community by ID:', await getCommunityAPI(getCurrentCommunityID()));
    console.log('User by useCurrentUser:', user);
    console.log('Community by useCurrentCommunity:', community);
    console.log('Events:', events);
    await handleCreateEvent(testEvent);
    console.log('Event by ID:', await getEventAPI('4fa83df7-482e-402f-9eac-97ad2f220a9e'));
    console.log('Members:', members);
    console.log('Posts:', posts);
    await handleCreatePost(testPost);
    console.log('Post by ID:', await getPostAPI('229ec76e-eb8c-43eb-8f17-1416e5740ad5"'));
  };

  return <Button onClick={handleButtonClick}>Log App Queries</Button>;
};
