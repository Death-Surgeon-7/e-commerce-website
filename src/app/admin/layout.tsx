'use client';

import { useUser, useDoc } from '@/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { UserProfile } from '@/lib/types';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const router = useRouter();
  const [userProfile, loadingProfile] = useDoc<UserProfile>(
    'users',
    user?.uid || ' '
  );
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loadingProfile) {
      setLoading(true);
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }

    if (userProfile && userProfile.role === 'admin') {
      setIsAdmin(true);
    } else {
      router.push('/');
    }
    setLoading(false);

  }, [user, userProfile, loadingProfile, router]);


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return <div>{children}</div>;
}
