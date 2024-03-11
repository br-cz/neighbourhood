import { useState, useEffect } from 'react';
import { getCurrentCommunityID } from './communityCustomHooks';
import { getCurrentUserID, getCurrentUser } from './usersCustomHooks';
import { getCommunityEventsAPI, createEventAPI } from '../api/services/event';
import { Event, Visibility } from '@/types/types';

export const useCreateEvent = () => {
  const handleCreateEvent = async (eventData: any) => {
    try {
      const createdEvent = await createEventAPI(getCurrentUserID(), getCurrentCommunityID(), {
        ...eventData,
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
