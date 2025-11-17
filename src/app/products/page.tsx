import ProductGrid from "@/components/products/product-grid";

export default function ProductsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">All Products</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Browse our full collection of high-quality menswear.
        </p>
      </div>
      <ProductGrid />
    </div>
  );
}
