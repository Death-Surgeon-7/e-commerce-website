'use client';

import { useUser, useDoc } from '@/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { UserProfile } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const router = useRouter();
  const { toast } = useToast();
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
    
    // Grant admin access if the role is 'admin' or if the email is the hardcoded admin email.
    if ((userProfile && userProfile.role === 'admin') || user.email === 'gnavneet444@gmail.com') {
      setIsAdmin(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Unauthorized',
        description: 'You do not have permission to access this page.',
      });
      router.push('/');
    }
    setLoading(false);
  }, [user, userProfile, loadingProfile, router, toast]);

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
