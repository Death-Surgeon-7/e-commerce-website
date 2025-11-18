import ProductGrid from "@/components/products/product-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="hidden md:block">
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
      <div className="md:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-44" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-[400px] w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function ProductsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">All Products</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Browse our full collection of high-quality menswear.
        </p>
      </div>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
