'use client';

import {
  doc,
  DocumentReference,
  onSnapshot,
  FirestoreError,
} from 'firebase/firestore';
import { useEffect, useState, useMemo } from 'react';

import { useFirestore } from '..';

function useDoc<T>(path: string, id: string): [T | null, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const firestore = useFirestore();

  const docRef = useMemo(
    () =>
      firestore ? (doc(firestore, path, id) as DocumentReference<T>) : null,
    [firestore, path, id]
  );

  useEffect(() => {
    if (!docRef) {
      if (firestore) {
        setLoading(false);
      }
      return;
    }

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        setLoading(true);
        if (snapshot.exists()) {
          setData(snapshot.data() as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (error: FirestoreError) => {
        console.error(`Error fetching document: ${error.message}`);
        setData(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docRef, firestore]);

  return [data, loading];
}

export default useDoc;
