import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createEvent } from '@/src/graphql/mutations';
import * as APITypes from '../API';
import { User } from '../models';

const client = generateClient();

export const useCreateEvent = () => {
  const [events, setEvents] = useState<string>('');
  const [error, setError] = useState('');

  const handleCreateEvent = async (eventData: APITypes.CreateEventInput) => {
    try {
      const userData = localStorage.getItem('userData')!;
      const parsedUserData: User = JSON.parse(userData);

      eventData.userEventsId = parsedUserData.id;
      eventData.communityEventsId = parsedUserData.selectedCommunity;

      const event = await client.graphql({ query: createEvent, variables: { input: eventData } });
      console.log('Event created:', event);

      setEvents(JSON.stringify(event));
    } catch (err: any) {
      console.error('Error creating event:', err);
      setError(err);
    }
  };

  return { events, error, handleCreateEvent };
};

export const useFetchEvents = () => {
  const [events, setEvents] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCommunityEvents = /* GraphQL */ `
    query GetCommunity($id: ID!) {
      getCommunity(id: $id) {
        id
        events {
          items {
            _deleted
            createdAt
            datetime
            description
            id
            images
            likedBy {
              items {
                userId
                user {
                  username
                  profilePic
                }
              }
            }
            location
            name
            updatedAt
            userEventsId
            visibility
            organizer {
              username
              profilePic
            }
          }
        }
      }
    }
  `;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem('userData')!;
        const parsedUserData: User = JSON.parse(userData);

        const community = await client.graphql({
          query: getCommunityEvents,
          variables: { id: parsedUserData.selectedCommunity },
        });

        setEvents(JSON.stringify(community));
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
