'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { useAuth } from '..';

function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const auth = useAuth();

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
}

export default useUser;
