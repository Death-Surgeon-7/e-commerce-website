"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useCurrency } from "@/context/currency-context";
import { categories } from "@/lib/data";

interface ProductFiltersProps {
  selectedCategories: string[];
  onCategoryChange: (categoryId: string, checked: boolean) => void;
  priceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  className?: string;
}

export default function ProductFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  selectedRating,
  onRatingChange,
  className
}: ProductFiltersProps) {

  const { formatPrice } = useCurrency();

  return (
    <aside className={className}>
      <h3 className="text-xl font-bold font-headline mb-4">Filters</h3>
      <Accordion type="multiple" defaultValue={["category", "price", "rating"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold">Category</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => onCategoryChange(category.id, !!checked)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="font-semibold">Price</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between text-sm text-muted-foreground mb-4">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
            </div>
            <Slider
                min={0}
                max={10000}
                step={500}
                value={priceRange}
                onValueChange={onPriceChange}
              />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rating">
          <AccordionTrigger className="font-semibold">Rating</AccordionTrigger>
          <AccordionContent>
            <RadioGroup value={String(selectedRating)} onValueChange={(value) => onRatingChange(Number(value))}>
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(rating)} id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="cursor-pointer">
                    {rating} stars & up
                  </Label>
                </div>
              ))}
               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="rating-any" />
                  <Label htmlFor="rating-any" className="cursor-pointer">Any</Label>
                </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
