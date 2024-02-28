import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@aws-amplify/auth';
import { notifications } from '@mantine/notifications';

export function useAuth(redirectUrl: string = '/') {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function checkUser() {
    try {
      const { userId } = await getCurrentUser();
      setUser(userId);
      setLoading(false);
    } catch (err) {
      router.push(redirectUrl);
      notifications.show({
        radius: 'md',
        title: 'You were logged out!',
        message: 'Please log in to continue to Neighbourhood.',
      });
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return { user, loading };
}
