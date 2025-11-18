import type { Category, Product, Testimonial } from "./types";

export const categories: Category[] = [
    { id: 't-shirts', name: 'T-Shirts', image: 'category-t-shirts' },
    { id: 'shirts', name: 'Shirts', image: 'category-shirts' },
    { id: 'jeans', name: 'Jeans', image: 'category-jeans' },
    { id: 'jackets', name: 'Jackets', image: 'category-jackets' },
    { id: 'accessories', name: 'Accessories', image: 'category-accessories' },
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
