import { generateClient } from 'aws-amplify/api';
import { NextResponse } from 'next/server';
import { configureAmplify } from '../utils/amplifyServerConfig';
import { getCoordinates } from '../getCoordinatesFromPostalCode/route';
import { listCommunities } from '@/src/graphql/queries';
import { getDistanceFromCoordinates } from '../getDistanceFromCoordinates/route';

configureAmplify();
const client = generateClient();

export async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url);
  const postalCode = searchParams.get('postalcode');

  if (typeof postalCode !== 'string') {
    return NextResponse.json({ error: 'Postal code must be a string.' }, { status: 400 });
  }

  const coordinatesResponse = await getCoordinates(postalCode);
  if (coordinatesResponse.error) {
    return NextResponse.json({ error: 'Error when retrieving coordinates from postal code' }, { status: coordinatesResponse.status });
  }

  const coordinates = `${coordinatesResponse.lat}, ${coordinatesResponse.lng}`;

  const todos = await client.graphql({ query: listCommunities });
  const { data: { listCommunities: { items } } } = todos;
  const communityDistances = [];

try {
  const distancePromises = items.map(async (item) => {
    const distanceResponse = await getDistanceFromCoordinates(coordinates, item.coordinates);
    if (distanceResponse.error) {
      throw new Error('Error when retrieving distances to communities');
    }
    return { community:
      { id: item.id,
        name: item.name,
        location: item.location,
        coordinates: item.location,
        image: item.image,
      },
      distanceKm: distanceResponse.distanceKm };
  });

  const distances = await Promise.all(distancePromises);
  communityDistances.push(...distances);
} catch (err) {
  const error = err as Error;
  return NextResponse.json({ error: error.message }, { status: 500 });
}

  communityDistances.sort((a, b) => (a.distanceKm as number) - (b.distanceKm as number));

  return NextResponse.json(communityDistances, { status: 200 });
}
