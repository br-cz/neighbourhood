// pages/api/getDistance.tsx

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface DistanceResponse {
  distanceKm: number;
  duration: string;
}

interface ErrorResponse {
  error: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<DistanceResponse | ErrorResponse>
) => {
  const { origin, destination } = req.query;

  // Ensure origin and destination are strings, TypeScript doesn't know the type of query parameters
  if (typeof origin !== 'string' || typeof destination !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameters' });
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const { data } = response;

    if (data.status !== 'OK') {
      return res.status(404).json({ error: 'No results found.' });
    }

    const { distance, duration } = data.rows[0].elements[0];
    return res.status(200).json({
      distanceKm: parseFloat(distance.text.replace(' km', '').replace(',', '')),
      duration: duration.text,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
