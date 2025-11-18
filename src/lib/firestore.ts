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
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product } from './types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const productsCollection = collection(firestore, 'products');

export const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const addProduct = (product: Omit<Product, 'id'>) => {
  const newProductData = {
    ...product,
    createdAt: serverTimestamp(),
  };
  addDoc(productsCollection, newProductData).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: productsCollection.path,
      operation: 'create',
      requestResourceData: newProductData,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
};

export const updateProduct = (
  id: string,
  product: Partial<Omit<Product, 'id'>>
) => {
  const productDoc = doc(firestore, 'products', id);
  const updatedProductData = {
    ...product,
    updatedAt: serverTimestamp(),
  };
  updateDoc(productDoc, updatedProductData).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: productDoc.path,
      operation: 'update',
      requestResourceData: updatedProductData,
    });
    errorEmitter.emit('permission-error', permissionError);
  });
};

export const deleteProduct = (id: string) => {
  const productDoc = doc(firestore, 'products', id);
  deleteDoc(productDoc).catch((serverError) => {
    const permissionError = new FirestorePermissionError({
      path: productDoc.path,
      operation: 'delete',
    });
    errorEmitter.emit('permission-error', permissionError);
  });
};
