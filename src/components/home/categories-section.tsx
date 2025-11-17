import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { categories } from "@/lib/data";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import {
  Card,
  CardContent
} from "@/components/ui/card";

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">Shop by Category</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore our collections and find the perfect look for any occasion.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {categories.map((category) => {
          const placeholder = getPlaceholderImage(category.image);
          return (
            <Link key={category.id} href={`/products?category=${category.id}`} className="group block">
              <Card className="overflow-hidden relative aspect-[3/4]">
                {placeholder && (
                   <Image
                    src={placeholder.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={placeholder.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-lg font-semibold text-white font-headline">{category.name}</h3>
                  <p className="text-sm text-accent flex items-center gap-1 transition-transform group-hover:translate-x-1">
                    Shop Now <ArrowRight className="w-4 h-4"/>
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
