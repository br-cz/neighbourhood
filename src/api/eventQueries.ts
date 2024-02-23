import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createEvent } from '@/src/graphql/mutations';
import { getCurrentCommunityID, getCurrentUserID } from '@/src/api/appQueries';
import { getEvent } from '../graphql/queries';
import { EventDataInput } from '@/types/types';

const client = generateClient();

export const getEventByID = async (eventId: string) => {
  const event = await client.graphql({
    query: getEvent,
    variables: { id: eventId },
  });
  return event.data.getEvent;
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
        const communityId = getCurrentCommunityID();
        const response = await client.graphql({
          query: getCommunityEvents,
          variables: { id: communityId },
        });
        const jsonEvents = JSON.parse(JSON.stringify(response));
        setEvents(jsonEvents.data.getCommunity.events.items);
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

export const useCreateEvent = () => {
  const handleCreateEvent = async (eventData: EventDataInput) => {
    try {
      const newEventData = {
        ...eventData,
        userEventsId: getCurrentUserID(),
        communityEventsId: getCurrentCommunityID(),
      };
      const event = await client.graphql({
        query: createEvent,
        variables: { input: newEventData },
      });
      console.log('Event created:', event.data.createEvent);

      return event.data.createEvent;
    } catch (err: any) {
      console.error('Error creating event:', err);
      return err;
    }
  };
  return { handleCreateEvent };
};
