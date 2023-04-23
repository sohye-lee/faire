import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

// const fetcher = (url: string) => fetch(url).then((response) => response.json());

interface ProfileResponse {
  ok: boolean;
  user: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>('/api/users/me');
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);

  return { user: data?.user, isLoading: !data && !error };
}
