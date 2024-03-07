/**
 * getClosestCommunities/route.tsx
 *
 * This API router retrieves communities near a provided postal code.
 *
 * Inputs:
 * - A GET request with a 'postalcode' query parameter.
 *
 * Outputs:
 * - Success: An array of communities sorted by distance, including community details and distance in kilometers.
 * - Error: A JSON error message with an HTTP status code, indicating the nature of the failure (invalid input, server error, etc.).
 */

import { generateClient } from '@aws-amplify/api';
import { NextResponse } from 'next/server';
import { configureAmplify } from '../utils/amplifyServerConfig';
import { listCommunities } from '@/src/graphql/queries';

configureAmplify();
const client = generateClient();

export async function GET(request: Request) {
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
  }

  // Extract query parameters
  const { searchParams } = new URL(request.url);
  const coordinates = searchParams.get('coordinates');

  if (typeof coordinates !== 'string') {
    return NextResponse.json({ error: 'Invalid request parameter.' }, { status: 400 });
  }

  const todos = await client.graphql({ query: listCommunities });
  const {
    data: {
      listCommunities: { items },
    },
  } = todos;
  const communityDistances = [];

  try {
    const distancePromises = items.map(async (item) => {
      const response = await fetch(
        `/api/getDistanceFromCoordinates?origin=${coordinates}destination=${item.coordinates}`
      );
      if (!response.ok) throw new Error('Failed to fetch communities');

      const data = await response.json();
      console.log(data);
      if ('error' in data) {
        throw new Error('Error when retrieving distances to communities');
      }
      return {
        community: {
          id: item.id,
          name: item.name,
          location: item.location,
          coordinates: item.coordinates,
          image: item.image,
        },
        distanceKm: data.distanceKm,
      };
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
