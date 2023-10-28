"use client"
import React, { useState } from 'react'


interface GalleryProps {
    images: string[];
    closeGallery: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ images, closeGallery }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div 
            className="fixed top-[-23px] left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50"
            onClick={closeGallery}
        >
            <div className="relative w-[80%] h-[80%] bg-white p-4 rounded-md" onClick={e => e.stopPropagation()}>
                <img 
                    src={images[currentIndex]} 
                    alt={`Gallery Image ${currentIndex}`} 
                    className="w-full h-full object-cover rounded"
                />
                <button onClick={closeGallery} className="absolute top-2 right-2 p-2 bg-white bg-opacity-70 hover:bg-opacity-80 rounded-full text-black transition-colors">X</button>
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-50% p-4 bg-white bg-opacity-70 hover:bg-opacity-80 rounded-full text-black">&#10094;</button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-50% p-4 bg-white bg-opacity-70 hover:bg-opacity-80 rounded-full text-black">&#10095;</button>
            </div>
        </div>
    );
};


export default Gallery