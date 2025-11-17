import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPlaceholderImage } from "@/lib/placeholder-images";

export default function HeroSection() {
  const heroImage = getPlaceholderImage('hero-1');
  
  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white bg-primary/20">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover -z-10"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 -z-10" />

      <div className="container max-w-4xl px-4 z-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight">
          Redefine Your Style
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/90">
          Discover curated collections of modern menswear that blend timeless
          craftsmanship with contemporary design.
        </p>
        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
