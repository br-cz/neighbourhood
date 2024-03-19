import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@aws-amplify/auth';
import { notifications } from '@mantine/notifications';

export function useAuth(redirectUrl: string = '/') {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { userId } = await getCurrentUser();
        setUser(userId);
        setLoading(false);
      } catch (error) {
        router.push(redirectUrl);
        notifications.show({
          radius: 'md',
          title: 'You were logged out!',
          message: 'Please log in to continue to Neighbourhood.',
        });
      }
    };

    checkUser();
  }, []);

  return { user, loading };
}
