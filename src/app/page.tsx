"use client";
import CategoriesSection from "@/components/home/categories-section";
import HeroSection from "@/components/home/hero-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import TrendingProductsSection from "@/components/home/trending-products-section";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="container">
        <CategoriesSection />
        <TrendingProductsSection />
        <Separator className="my-12 md:my-24" />
        <TestimonialsSection />
      </div>
    </div>
  );
}
