import { useState, useEffect } from 'react';
import { getCurrentCommunityID } from './communityCustomHooks';
import { getCurrentUserID, getCurrentUser } from './usersCustomHooks';
import {
  getCommunityEventsAPI,
  createEventAPI,
  listUserSavedEventsAPI,
  createEventSaveAPI,
  deleteEventSaveAPI,
} from '../api/services/event';
import { Event, Visibility } from '@/types/types';

export const useCreateEvent = () => {
  const handleCreateEvent = async (eventData: any) => {
    try {
      const createdEvent = await createEventAPI(getCurrentUserID(), getCurrentCommunityID(), {
        ...eventData,
        saveCount: 0,
        images: [eventData.eventImage],
      });
      console.log('Event created:', createdEvent);
      return createdEvent;
    } catch (err) {
      console.error('Error creating event:', err);
      return err;
    }
  };

  return { handleCreateEvent };
};

export const useFetchEvents = (refresh: boolean = false) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        const communityId = getCurrentCommunityID();
        const fetchedEvents = await getCommunityEventsAPI(communityId);
        const visibleEvents = fetchedEvents.filter(
          (event: Event) =>
            event.visibility === Visibility.PUBLIC ||
            event.organizer.id === user!.id ||
            (event.visibility === Visibility.FRIENDS_ONLY &&
              user!.friends!.includes(event.organizer.id))
        );
        setEvents(visibleEvents);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [refresh]);

  return { events, loading, error };
};

export const useEventSaves = (eventId: string) => {
  const [isSaved, setIsSaved] = useState(false);
  const [userEventSave, setUserEventSave] = useState<any>(null);
  const [error, setError] = useState('');
  const userId = getCurrentUserID();

  const fetchSaveStatus = async () => {
    try {
      const likesResponse = await listUserSavedEventsAPI();
      const userLike = likesResponse.find(
        (item) => item.eventId === eventId && item.userId === userId && !item._deleted
      );
      setIsSaved(!!userLike);
      setUserEventSave(userLike);
    } catch (err) {
      console.error('Error fetching save status:', err);
      setError('Failed to fetch save status');
    }
  };

  useEffect(() => {
    fetchSaveStatus();
  }, [eventId, userId]);

  const saveEvent = async () => {
    if (!isSaved) {
      try {
        await createEventSaveAPI(eventId);
        fetchSaveStatus();
      } catch (err) {
        console.error('Error saving event:', err);
        setError('Failed to save event');
      }
    }
  };

  const unsaveEvent = async () => {
    if (isSaved && userEventSave) {
      try {
        await deleteEventSaveAPI(userEventSave);
        fetchSaveStatus();
      } catch (err) {
        console.error('Error unsaving event:', err);
        setError('Failed to unsave event');
      }
    }
  };

  return { isSaved, saveEvent, unsaveEvent, error };
};

export const useUserEventSaves = (refresh: boolean) => {
  const [userEventSaves, setUserEventSaves] = useState(new Map());
  const userId = getCurrentUserID();

  useEffect(() => {
    const fetchUserSaves = async () => {
      try {
        const savesResponse = await listUserSavedEventsAPI();
        const userSavesMap = new Map();
        savesResponse.forEach((save) => {
          if (save.userId === userId && !save._deleted) {
            userSavesMap.set(save.eventId, true);
          }
        });
        setUserEventSaves(userSavesMap);
      } catch (error) {
        console.error('Failed to fetch user saves:', error);
      }
    };

    fetchUserSaves();
  }, [userId, refresh]);

  return { saves: userEventSaves };
};
