import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from 'aws-amplify/auth';

export function useAuth(redirectUrl: string = '/login') {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { userId } = await getCurrentUser();
      setUser(userId);
      setLoading(false);
    } catch (err) {
      router.push(redirectUrl);
    }
  }

  return { user, loading };
}
