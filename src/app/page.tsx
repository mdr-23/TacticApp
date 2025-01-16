'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from './routes/routes';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
      router.push(paths.dashboard);
  }, [router]);

  return null;
}
