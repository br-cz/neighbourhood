import { generateClient } from '@aws-amplify/api';
import {
  createEvent,
  createUserLikedEvents,
  deleteEvent,
  deleteUserLikedEvents,
  updateEvent,
} from '@/src/graphql/mutations';
import { getEvent, listUserLikedEvents } from '@/src/graphql/queries';
import { HttpError } from '@/src/models/error/HttpError';
import { getCurrentUserID } from './community';
import { Event } from '@/src/types/types';
import { UserLikedEvents } from '@/src/API';

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
            saveCount
            location
            name
            updatedAt
            userEventsId
            visibility
            organizer {
              id
              username
              firstName
              lastName
              profilePic
            }
            _version
            _deleted
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
    throw new HttpError(
      `Error retrieving community events: ${error.message}`,
      error.statusCode || 500
    );
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

export const deleteEventAPI = async (event: Event) => {
  try {
    const response = await client.graphql({
      query: deleteEvent,
      variables: {
        input: {
          id: event.id,
          _version: event._version,
        },
      },
    });
    console.log('Event deleted successfully:', response.data.deleteEvent);
    return response.data.deleteEvent;
  } catch (error: any) {
    throw new HttpError(`Error deleting event: ${error.message}`, error.statusCode || 500);
  }
};

export const updateEventImageAPI = async (postId: string, image: string, _version: number) => {
  try {
    const updatedEvent = await client.graphql({
      query: updateEvent,
      variables: {
        input: {
          id: postId,
          images: [image],
          _version,
        },
      },
    });
    console.log('User updated successfully:', updatedEvent.data.updateEvent);
    return updatedEvent.data.updateEvent;
  } catch (error: any) {
    throw new HttpError(`Error updating event image: ${error.message}`, error.statusCode || 500);
  }
};

export const listUserSavedEventsAPI = async () => {
  try {
    const response = await client.graphql({
      query: listUserLikedEvents,
    });
    const filteredResponse = response.data.listUserLikedEvents.items.filter(
      (item: any) => !item._deleted
    );
    return filteredResponse;
  } catch (error: any) {
    throw new HttpError(
      `Error retrieving user saved events: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const updateEventSaveCountAPI = async (eventId: string, adjustment: number) => {
  try {
    const eventResponse = await getEventAPI(eventId);
    if (!eventResponse) {
      throw new Error('Event not found');
    }
    const { _version, saveCount = 0 } = eventResponse;
    const newSaveCount = Math.max(saveCount! + adjustment, 0);
    const updatedEvent = await client.graphql({
      query: updateEvent,
      variables: {
        input: {
          id: eventId,
          saveCount: newSaveCount,
          _version,
        },
      },
    });
    console.log('Event updated successfully:', updatedEvent.data.updateEvent);
    return updatedEvent.data.updateEvent;
  } catch (error: any) {
    throw new HttpError(
      `Error updating event save count: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const createEventSaveAPI = async (eventId: string) => {
  const userId = getCurrentUserID();
  try {
    const createUserLikedEventsResponse = await client.graphql({
      query: createUserLikedEvents,
      variables: {
        input: {
          eventId,
          userId,
        },
      },
    });
    await updateEventSaveCountAPI(eventId, 1);
    return createUserLikedEventsResponse.data.createUserLikedEvents;
  } catch (error: any) {
    throw new HttpError(
      `Error creating user event connection: ${error.message}`,
      error.statusCode || 500
    );
  }
};

export const deleteEventSaveAPI = async (like: UserLikedEvents) => {
  try {
    const deleteUserLikedEventsResponse = await client.graphql({
      query: deleteUserLikedEvents,
      variables: {
        input: {
          id: like.id,
          _version: like._version,
        },
      },
    });
    await updateEventSaveCountAPI(like.eventId, -1);
    return deleteUserLikedEventsResponse.data.deleteUserLikedEvents;
  } catch (error: any) {
    throw new HttpError(`Error deleting event save: ${error.message}`, error.statusCode || 500);
  }
};
