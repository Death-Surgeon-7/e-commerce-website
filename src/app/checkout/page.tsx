'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-md mx-auto text-center border rounded-lg p-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-3xl font-bold font-headline">Checkout</h1>
        <p className="mt-2 text-muted-foreground">
          This is a placeholder for the checkout process. In a real application,
          this is where you would integrate a payment gateway.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
