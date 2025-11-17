"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";
import ProductCard from "@/components/shared/product-card";
import ProductFilters from "./product-filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategories([category]);
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)
    );
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSelectedRating(0);
    setSortBy("newest");
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    filtered = filtered.filter(
      (product) =>
        (product.discount ?? product.price) >= priceRange[0] &&
        (product.discount ?? product.price) <= priceRange[1]
    );

    if (selectedRating > 0) {
      filtered = filtered.filter(
        (product) => product.rating >= selectedRating
      );
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => (a.discount ?? a.price) - (b.discount ?? b.price));
        break;
      case "price-desc":
        filtered.sort((a, b) => (b.discount ?? b.price) - (a.discount ?? a.price));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        // Assuming products are already sorted by newest, or we could add a date field
        break;
    }

    return filtered;
  }, [selectedCategories, priceRange, selectedRating, sortBy]);
  
  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 10000 || selectedRating !== 0;


  const filtersComponent = (
    <ProductFilters
      selectedCategories={selectedCategories}
      onCategoryChange={handleCategoryChange}
      priceRange={priceRange}
      onPriceChange={setPriceRange}
      selectedRating={selectedRating}
      onRatingChange={setSelectedRating}
    />
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Desktop Filters */}
      <div className="hidden md:block">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold font-headline">Filters</h3>
            {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                    <X className="w-4 h-4 mr-2"/>
                    Clear
                </Button>
            )}
        </div>
        <Separator className="mb-4" />
        <ProductFilters
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          selectedRating={selectedRating}
          onRatingChange={setSelectedRating}
        />
      </div>

      {/* Main Content */}
      <div className="md:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>

           {/* Mobile Filters Trigger */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold font-headline">Filters</h3>
                    {hasActiveFilters && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                            <X className="w-4 h-4 mr-2"/>
                            Clear
                        </Button>
                    )}
                  </div>
                  <Separator className="mb-4"/>
                  {filtersComponent}
                </div>
            </SheetContent>
        </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold">No Products Found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters to find what you're looking for.
            </p>
            <Button onClick={clearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
