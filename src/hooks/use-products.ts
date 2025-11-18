'use client';

import { useCollection } from '@/firebase';
import { Product } from '@/lib/types';

export function useProducts() {
  const [products, loading] = useCollection<Product>('products');

  return { products, loading };
}
