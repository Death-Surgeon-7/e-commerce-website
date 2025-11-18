import { useContext } from 'react';

import useUser from './auth/use-user';
import { FirebaseClientProvider } from './client-provider';
import {
  FirebaseContext,
  FirebaseContextValue,
  FirebaseProvider,
} from './provider';

export function useFirebase() {
  return useContext(FirebaseContext) as FirebaseContextValue;
}

export function useFirebaseApp() {
  return useFirebase()?.app;
}

export function useAuth() {
  return useFirebase()?.auth;
}

export function useFirestore() {
  return useFirebase()?.firestore;
}

export { useUser, FirebaseProvider, FirebaseClientProvider };
