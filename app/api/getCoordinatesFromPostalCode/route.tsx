/**
 * getCoordinatesFromPostalCode/route.tsx
 *
 * This API router will retrieve coordinates from a given postal code.
 *
 * Inputs:
 * - GET request with a 'postalcode' query parameter.
 *
 * Outputs:
 * - Success: JSON object with latitude and longitude (in decimal degrees format) and status code 200.
 * - Error: JSON object containing error message and error status code.
 */

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function getCoordinates(postalCode: string) {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postalCode)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      // Return the coordinates object directly
      return { lat, lng };
    }
    // Return an error object if no results are found
    return { error: 'No results found.', status: 404 };
  } catch (error) {
    console.error(error);
    // Return an error object in case of an exception
    return { error: 'Internal server error.', status: 500 };
  }
}

export async function GET(
  request: Request
) {
    const { searchParams } = new URL(request.url);
    const postalCode = searchParams.get('postalcode');

    if (typeof postalCode !== 'string') {
      return NextResponse.json({ error: 'Postal code must be a string.' }, { status: 400 });
    }

    const result = await getCoordinates(postalCode);

    if ('lat' in result && 'lng' in result) {
      // Success: Coordinates were found
      return NextResponse.json(result, { status: 200 });
    }
    // Error: No coordinates found or an internal error occurred
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
