'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  PlusCircle,
  Package,
  Edit,
  Trash2,
  Tag,
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductForm } from './product-form';
import { useProducts } from '@/hooks/use-products';
import { Product } from '@/lib/types';
import { useCurrency } from '@/context/currency-context';
import { deleteProduct } from '@/lib/firestore';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DashboardPage() {
  const { products, loading } = useProducts();
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const { formatPrice } = useCurrency();

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
  };

  const totalProducts = products.length;
  const totalCategories = categories.length;

  return (
    <div className="w-full p-4 md:p-8">
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSelectedProduct(null);
          }
        }}
      >
        <div className="flex items-center justify-between pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your products and view store statistics.
            </p>
          </div>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? 'Edit Product' : 'Add Product'}
            </DialogTitle>
            <DialogDescription>
              {selectedProduct
                ? 'Update the details of your product.'
                : 'Add a new product to your store.'}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-6">
            <ProductForm
              product={selectedProduct}
              onSuccess={() => setOpen(false)}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Number of products in your store
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Number of product categories
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">
          Your Products
        </h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const placeholder = getPlaceholderImage(product.image);
              const imageUrl = product.image.startsWith('https://') ? product.image : placeholder?.imageUrl ?? '/placeholder.svg';

              return (
                <Card key={product.id}>
                  <CardHeader className="p-0 relative">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      width={400}
                      height={500}
                      className="object-cover w-full aspect-[4/5] rounded-t-lg"
                      data-ai-hint={placeholder?.imageHint}
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {product.category}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="font-bold text-lg">
                      {formatPrice(product.discount ?? product.price)}
                    </div>
                    {product.discount && (
                      <Badge variant="destructive">SALE</Badge>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
