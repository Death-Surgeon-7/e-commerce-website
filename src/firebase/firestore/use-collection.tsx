'use client';

import {
  collection,
  onSnapshot,
  query,
  Query,
  FirestoreError,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useFirestore } from '..';

function useCollection<T>(path: string, q?: Query): [T[], boolean] {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const firestore = useFirestore();

  useEffect(() => {
    if (!firestore) {
      setLoading(false);
      return;
    }

    const collectionRef = collection(firestore, path);
    const finalQuery = q || query(collectionRef);

    const unsubscribe = onSnapshot(
      finalQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(items);
        setLoading(false);
      },
      (error: FirestoreError) => {
        console.error(`Error fetching collection: ${error.message}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, path, q]);

  return [data, loading];
}

export default useCollection;
