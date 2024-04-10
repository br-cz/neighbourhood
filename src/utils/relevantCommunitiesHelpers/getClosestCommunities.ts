import { generateClient } from '@aws-amplify/api';
import { listCommunities } from '@/src/graphql/queries';
import { configureAmplify } from '@/src/components/ConfigureAmplifyServer';
import { Community } from '@/src/API';

export interface CommunityWithDistance {
  community: Community;
  distanceKm: number;
}

configureAmplify();
const client = generateClient();

export async function getClosestCommunities(coordinates: string): Promise<CommunityWithDistance[]> {
  const todos = await client.graphql({ query: listCommunities });
  const {
    data: {
      listCommunities: { items },
    },
  } = todos;

  const communityDistances: CommunityWithDistance[] = [];

  try {
    const distancePromises = items.map(async (item: Community) => {
      const response = await fetch(
        `/api/getDistance?origin=${encodeURIComponent(coordinates)}&destination=${encodeURIComponent(item.coordinates)}`
      );
      const data = await response.json();
      if (data?.error) throw new Error(`Failed to fetch communities: ${data.error}`);

      return {
        community: item,
        distanceKm: data.distanceKm,
      };
    });

    const distances = await Promise.all(distancePromises);
    communityDistances.push(...distances);
  } catch (err) {
    console.error(err);
    throw err;
  }

  return communityDistances.sort((a, b) => a.distanceKm - b.distanceKm);
}
