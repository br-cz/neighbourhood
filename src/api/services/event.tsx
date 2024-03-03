import { generateClient } from '@aws-amplify/api';
import { createEvent, updateEvent } from '@/src/graphql/mutations';
import { getEvent } from '@/src/graphql/queries';
import { HttpError } from '@/src/models/error/HttpError';

const client = generateClient();

export const getEventAPI = async (eventId: string) => {
    try {
        const response = await client.graphql({
            query: getEvent,
            variables: { id: eventId },
        });
        return response.data.getEvent;
    } catch (error: any) {
        throw new HttpError(`Error retrieving event: ${error.message}`, error.statusCode || 500);
    }
};

export const getCommunityEventsAPI = async (communityId: string) => {
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
              firstName
              lastName
              profilePic
            }
          }
        }
      }
    }
  `;
    try {
        const response = await client.graphql({
            query: getCommunityEvents,
            variables: { id: communityId },
        });
        const jsonResponse = JSON.parse(JSON.stringify(response));
        return jsonResponse.data.getCommunity.events.items;
    } catch (error: any) {
        throw new HttpError(`Error retrieving community events: ${error.message}`, error.statusCode || 500);
    }
};

export const createEventAPI = async (userId: string, communityId: string, eventData: any) => {
    try {
        const newEventData = {
            ...eventData,
            userEventsId: userId,
            communityEventsId: communityId,
        };
        const response = await client.graphql({
            query: createEvent,
            variables: { input: newEventData },
        });
        return response.data.createEvent;
    } catch (error: any) {
        throw new HttpError(`Error creating event: ${error.message}`, error.statusCode || 500);
    }
};

export const updateEventImageAPI = async (postId: string, image: string) => {
  const input = { id: postId, images: [image] };
    try {
        const updatedEvent = await client.graphql({
        query: updateEvent,
        variables: { input },
        });
        console.log('User updated successfully:', updatedEvent.data.updateEvent);
        return updatedEvent.data.updateEvent;
    } catch (error: any) {
        throw new HttpError(`Error updating event image: ${error.message}`, error.statusCode || 500);
    }
};
