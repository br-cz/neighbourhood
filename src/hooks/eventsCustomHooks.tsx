import { useState, useEffect } from 'react';
import { getCurrentCommunityID } from './communityCustomHooks';
import { getCurrentUserID, getCurrentUser } from './usersCustomHooks';
import { getCommunityEventsAPI, createEventAPI } from '../api/services/event';
import { Event, Visibility } from '@/types/types';
import { retrieveImage as retrieveProfilePicture } from '@/components/utils/s3Helpers/UserProfilePictureS3Helper';
import { retrieveImage as retrieveEventImage } from '@/components/utils/s3Helpers/EventImageS3Helper';

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

        const eventsWithImages = await Promise.all(
          visibleEvents.map(async (event: any) => {
            const eventImage = await retrieveEventImage(event.id).catch(() => null);
            const profilePicture = await retrieveProfilePicture(event.organizer.id).catch(
              () => null
            );
            return {
              ...event,
              images: [eventImage],
              organizer: {
                ...event.organizer,
                profilePic: profilePicture,
              },
            };
          })
        );

        setEvents(eventsWithImages);
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
