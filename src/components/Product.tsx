import React from "react";

interface ProductProps {
    product: {
        title: string;
        description: string;
        price: string;
        mainImage: string;
        gallery: string[];
        soldCount: number;
    };
    setActiveGallery: (gallery: string[] | null) => void;
}

const Product: React.FC<ProductProps> = ({ product, setActiveGallery }) => {
    return (
        <div className="card xl-min:card-side bg-base-100 shadow-xl mb-6 flex flex-col xl-max:flex-row">
            <figure className='w-full xl-max:w-[40%]'>
                <img
                    src={product.mainImage}
                    alt={product.title}
                    className="cursor-pointer w-full object-cover"
                    onClick={() => setActiveGallery([...product.gallery])}
                />
            </figure>
            <div className="card-body mt-4 xl-max:mt-0">
                <div className="flex justify-between">
                    <h2 className="card-title">{product.title}</h2>
                    <span className="text-sm">Sold: <span className="font-semibold">{product.soldCount}</span></span> {/* Тук се показва броя продадени единици */}
                </div>
                <p>{product.description}</p>
                <div className="flex flex-row card-actions space-x-2 items-center justify-between sm:flex-row sm:space-x-2 sm:space-y-0 space-y-2">
                    <span className="text-lg font-semibold">{product.price}</span>
                    <div className='flex flex-row gap-3'>
                        <button className="btn btn-primary">Details</button>
                        {/* <button className="btn btn-outline">Edit</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Product;