'use client';

import {
  collection,
  onSnapshot,
  query,
  Query,
  FirestoreError,
  CollectionReference,
} from 'firebase/firestore';
import { useEffect, useState, useMemo } from 'react';

import { useFirestore } from '..';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

function useCollection<T>(path: string, q?: Query): [T[], boolean] {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const firestore = useFirestore();

  const finalQuery = useMemo(() => {
    if (!firestore) return null;
    const collectionRef = collection(firestore, path) as CollectionReference<T>;
    return q || query(collectionRef);
  }, [firestore, path, q]);

  useEffect(() => {
    if (!finalQuery) {
      if (firestore) {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
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
        const permissionError = new FirestorePermissionError({
          path: (finalQuery as any)._query.path.segments.join('/'),
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, finalQuery]);

  return [data, loading];
}

export default useCollection;
