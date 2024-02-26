/**
 * getDistanceFromCoordinates/route.tsx
 *
 * This API router will retrieve the distance in km and the travel time duration between two given coordinates.
 *
 * Inputs:
 * - GET request with 'origin' and 'destination' query parameters representing coordinates as strings in decimal degrees format ("99.99999, -99.99999").
 *
 * Outputs:
 * - Success: JSON object with `distanceKm` and `duration` and status code 200.
 * - Error: JSON object with error message and error status code.
 */

import { NextResponse } from 'next/server';
import axios from 'axios';

const extractDistance = (distanceStr: string) => parseFloat(distanceStr.replace(' km', ''));

export async function getDistanceFromCoordinates(origin: string, destination: string) {
  // Construct Google Maps API URL
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const { data } = await axios.get(url);

    // Handle Google Maps API response
    if (data.status !== 'OK') {
      // Return an error object if the API status is not 'OK'
      return { error: 'No results found.', status: 404 };
    }

    // Use object destructuring to extract distance and duration
    const { distance, duration } = data.rows[0].elements[0];

    // Return the distance and duration text directly
    return { distanceKm: extractDistance(distance.text), duration: duration.text };
  } catch (error) {
    console.error(error);
    // Return an error object in case of an exception
    return { error: 'Internal server error.', status: 500 };
  }
}

export async function GET(request: Request) {
  // Validate HTTP method
  if (request.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
  }

  // Extract query parameters
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  // Validate parameters
  if (typeof origin !== 'string' || typeof destination !== 'string') {
    return NextResponse.json({ error: 'Invalid request parameters.' }, { status: 400 });
  }

  const result = await getDistanceFromCoordinates(origin as string, destination as string);

  // Check if the result includes distance and duration information
  if ('distance' in result && 'duration' in result) {
    // Success: Return the distance and duration information
    return NextResponse.json(result, { status: 200 });
  }
  // Error: Use the status code from the result and return the error message
  return NextResponse.json({ error: result.error }, { status: result.status });
}
