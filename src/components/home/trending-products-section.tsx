"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from "@/lib/data";
import ProductCard from "@/components/shared/product-card";

export default function TrendingProductsSection() {
  const trendingProducts = products.slice(0, 8);

  return (
    <section className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Trending Now</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Check out our most popular pieces, loved by our customers.
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {trendingProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex"/>
        <CarouselNext className="hidden lg:flex"/>
      </Carousel>
    </section>
  );
}
