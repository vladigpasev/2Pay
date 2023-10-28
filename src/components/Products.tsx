"use client"
import React, { useState } from 'react';
import Product from '@/components/Product';
import Gallery from './Gallery';

function Products() {
    const productList = [
        {
            title: "Product 1",
            description: "Description for product 1",
            price: "$20",
            mainImage: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
            gallery: [
                "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
                "https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=1000&format=pjpg&exif=0&iptc=0",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
                "https://www.volusion.com/blog/content/images/2021/09/Product-Photography.jpeg"
            ],
            soldCount: 5 
        },
        {
            title: "Product 1",
            description: "Description for product 1",
            price: "$20",
            mainImage: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
            gallery: [
                "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
                "https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=1000&format=pjpg&exif=0&iptc=0",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
                "https://www.volusion.com/blog/content/images/2021/09/Product-Photography.jpeg"
            ],
            soldCount: 5 
        },
        {
            title: "Product 1",
            description: "Description for product 1",
            price: "$20",
            mainImage: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
            gallery: [
                "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
                "https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=1000&format=pjpg&exif=0&iptc=0",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
                "https://www.volusion.com/blog/content/images/2021/09/Product-Photography.jpeg"
            ],
            soldCount: 5 
        },
        {
            title: "Product 1",
            description: "Description for product 1",
            price: "$20",
            mainImage: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
            gallery: [
                "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
                "https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=1000&format=pjpg&exif=0&iptc=0",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
                "https://www.volusion.com/blog/content/images/2021/09/Product-Photography.jpeg"
            ],
            soldCount: 5 
        },
        {
            title: "Product 1",
            description: "Description for product 1",
            price: "$20",
            mainImage: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
            gallery: [
                "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg",
                "https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=1000&format=pjpg&exif=0&iptc=0",
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
                "https://www.volusion.com/blog/content/images/2021/09/Product-Photography.jpeg"
            ],
            soldCount: 5 
        },
        // ... other products
    ];

    const [activeGallery, setActiveGallery] = useState<string[] | null>(null);

    const closeGallery = () => {
        setActiveGallery(null);
    };

    return (
        <div className="sm:max-h-[calc(100vh-64px)] p-10 space-y-6 sm:overflow-y-auto">
            {productList.map((product, idx) => (
                <Product key={idx} product={product} setActiveGallery={setActiveGallery} />
            ))}

            {activeGallery && (
                <Gallery 
                    images={activeGallery}
                    closeGallery={closeGallery}
                />
            )}
        </div>
    );


}

export default Products;
