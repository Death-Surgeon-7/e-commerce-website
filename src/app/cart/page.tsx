'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useCurrency } from '@/context/currency-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, loading } = useCart();
  const { formatPrice } = useCurrency();

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 border rounded-lg">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
                <Link href="/products">Start Shopping</Link>
            </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {cartItems.map((item) => {
                    const placeholder = getPlaceholderImage(item.image);
                    return (
                      <div key={item.id} className="flex items-center gap-4 p-4">
                        <Image
                          src={placeholder?.imageUrl ?? '/placeholder.svg'}
                          alt={item.name}
                          width={100}
                          height={133}
                          className="rounded-md object-cover"
                           data-ai-hint={placeholder?.imageHint}
                        />
                        <div className="flex-grow">
                          <Link href={`/products/${item.productId}`} className="font-semibold hover:text-primary">{item.name}</Link>
                          <p className="text-muted-foreground text-sm">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 0)}
                                className="h-8 w-14 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive mt-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
