import type { Category, Product, Testimonial } from "./types";

export const categories: Category[] = [
    { id: 't-shirts', name: 'T-Shirts', image: 'category-t-shirts' },
    { id: 'shirts', name: 'Shirts', image: 'category-shirts' },
    { id: 'jeans', name: 'Jeans', image: 'category-jeans' },
    { id: 'jackets', name: 'Jackets', image: 'category-jackets' },
    { id: 'accessories', name: 'Accessories', image: 'category-accessories' },
];

export const products: Product[] = [
    { id: '1', name: 'Urban Explorer T-Shirt', price: 2499, category: 't-shirts', image: 'product-1', rating: 4.5, reviews: 112 },
    { id: '2', name: 'Classic Denim Jacket', price: 7499, category: 'jackets', image: 'product-2', rating: 4.8, reviews: 254 },
    { id: '3', name: 'Slim-Fit Chinos', price: 4999, discount: 3999, category: 'jeans', image: 'product-3', rating: 4.3, reviews: 98 },
    { id: '4', name: 'Azure Blue Formal Shirt', price: 5999, category: 'shirts', image: 'product-4', rating: 4.7, reviews: 150 },
    { id: '5', name: 'Artisan Leather Belt', price: 3499, category: 'accessories', image: 'product-5', rating: 4.9, reviews: 301 },
    { id: '6', name: 'Distressed Denim Jeans', price: 6299, category: 'jeans', image: 'product-6', rating: 4.2, reviews: 88 },
    { id: '7', name: 'Tech Fleece Hoodie', price: 8299, discount: 6499, category: 'jackets', image: 'product-7', rating: 4.6, reviews: 189 },
    { id: '8', name: 'Mariner\'s Beanie', price: 1999, category: 'accessories', image: 'product-8', rating: 4.4, reviews: 76 },
];

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Alex Johnson',
        title: 'Verified Customer',
        quote: 'The quality of the clothing is outstanding, and the fit is perfect. I\'ve already placed my second order. Highly recommended!',
        avatar: 'avatar-1'
    },
    {
        id: '2',
        name: 'Ben Carter',
        title: 'Fashion Blogger',
        quote: 'FashionVerse has become my go-to for stylish and durable menswear. Their collections are always on-trend. The denim jacket is a must-have.',
        avatar: 'avatar-2'
    },
    {
        id: '3',
        name: 'Chris Davis',
        title: 'Happy Shopper',
        quote: 'Excellent customer service and fast shipping. The website is easy to navigate, and the whole shopping experience was a breeze.',
        avatar: 'avatar-3'
    }
];
