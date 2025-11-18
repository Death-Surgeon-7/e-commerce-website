'use client';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { firebaseApp } from '@/firebase/config';
import { getFirestore } from 'firebase/firestore';
import { Product } from './types';

const firestore = getFirestore(firebaseApp);

const productsCollection = collection(firestore, 'products');

export const addProduct = async (product: Omit<Product, 'id'>) => {
  await addDoc(productsCollection, {
    ...product,
    createdAt: serverTimestamp(),
  });
};

export const updateProduct = async (
  id: string,
  product: Partial<Omit<Product, 'id'>>
) => {
  const productDoc = doc(firestore, 'products', id);
  await updateDoc(productDoc, {
    ...product,
    updatedAt: serverTimestamp(),
  });
};

export const deleteProduct = async (id: string) => {
  const productDoc = doc(firestore, 'products', id);
  await deleteDoc(productDoc);
};
