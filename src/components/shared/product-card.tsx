import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";

import type { Product } from "@/lib/types";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const placeholder = getPlaceholderImage(product.image);

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="relative block group">
          <Image
            src={placeholder?.imageUrl ?? "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={800}
            className="object-cover w-full aspect-[3/4] transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={placeholder?.imageHint}
          />
           {product.discount && (
            <Badge 
              variant="destructive" 
              className="absolute top-3 right-3"
            >
              SALE
            </Badge>
          )}
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-xs text-muted-foreground uppercase">{product.category}</p>
        <CardTitle className="text-lg mt-1 mb-2 font-headline">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted-foreground/50")} />
                ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-baseline gap-2">
          {product.discount ? (
            <>
              <p className="text-xl font-bold text-primary">${product.discount.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</p>
          )}
        </div>
        <Button size="sm" variant="outline">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
