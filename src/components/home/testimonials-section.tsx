import Image from "next/image";
import { Star } from "lucide-react";

import { testimonials } from "@/lib/data";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TestimonialsSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Customers Say</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Real stories from satisfied shoppers.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial) => {
          const placeholder = getPlaceholderImage(testimonial.avatar);
          return (
            <Card key={testimonial.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    {placeholder && <AvatarImage src={placeholder.imageUrl} alt={testimonial.name} data-ai-hint={placeholder.imageHint} />}
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <blockquote className="text-muted-foreground italic border-l-2 pl-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
