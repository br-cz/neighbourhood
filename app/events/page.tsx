'use client';

import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Select, SimpleGrid, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { EventCard } from '@/components/EventCard/EventCard';
import { NeighbourhoodShell } from '@/components/NeighbourhoodShell/NeighbourhoodShell';
import { CreateEventDrawer } from '@/components/CreateEventDrawer/CreateEventDrawer';
import { ViewEventModal } from '@/components/ViewEventModal/ViewEventModal';

export default function EventsPage() {
  const [drawerOpened, drawerHandlers] = useDisclosure(false);
  const [viewEventModalOpened, setViewEventModalOpened] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Placeholder data until we have our data figured out
  const users = {
    1: {
      name: 'Demessie Amede',
      profilePic: 'https://avatar.iran.liara.run/public/19',
    },
    2: {
      name: 'Gurman Toor',
      profilePic: 'https://avatar.iran.liara.run/public/3',
    },
  };
  const events = {
    1: {
      name: 'Yard Sale!!',
      description: 'Come check out our yard sale!',
      datetime: new Date('2023-05-12T19:00:00'),
      location: '22 Bridge Lake Dr.',
      attendees: [users[1], users[1], users[2]],
      organizer: users[1],
      image: 'https://i.pinimg.com/474x/b9/c1/88/b9c188de7d5e572dd57d5e4e291df7f5.jpg',
    },
    2: {
      name: "Gurman's Backyard BBQ",
      description: 'Come join us for a BBQ in my backyard!',
      datetime: new Date('2023-04-05T19:00:00'),
      location: '54 Bridge Lake Dr.',
      attendees: [users[1], users[1], users[2], users[1], users[1], users[1]],
      organizer: users[2],
      image:
        'https://media.istockphoto.com/id/954735678/vector/bbq-party-background-with-grill-barbecue-poster-flat-style-vector-illustration.jpg?s=612x612&w=0&k=20&c=CMlzbshRjXp1GL2aAykmG-W7RnsMoJPe3IhMS_iZp6k=',
    },
  };

  const handleViewEvent = (event: any) => {
    setSelectedEvent(event);
    setViewEventModalOpened(true);
  };

  return (
    <NeighbourhoodShell>
      <Group justify="space-between" m="20">
        <Title order={1}>Events</Title>
        <Group>
          <Select
            radius="md"
            placeholder="Upcoming"
            data={['Upcoming', 'Newly Posted', 'Alphabetical', 'Attendees']}
          />
          <TextInput
            radius="md"
            rightSectionPointerEvents="none"
            rightSection={<IconSearch />}
            placeholder="Search..."
          />
          <Button radius="md" variant="filled" onClick={drawerHandlers.open}>
            New Event...
          </Button>
        </Group>
      </Group>

      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing={{ base: 5, sm: 'lg' }}
        verticalSpacing={{ base: 'md', sm: 'lg' }}
      >
        {Object.entries(events).map(([id, event]) => (
          <EventCard key={id} event={event} onView={() => handleViewEvent(event)} />
        ))}
      </SimpleGrid>

      <CreateEventDrawer opened={drawerOpened} onClose={drawerHandlers.close} />

      {selectedEvent && (
        <ViewEventModal
          opened={viewEventModalOpened}
          onClose={() => setViewEventModalOpened(false)}
          event={selectedEvent}
        />
      )}
    </NeighbourhoodShell>
  );
}
