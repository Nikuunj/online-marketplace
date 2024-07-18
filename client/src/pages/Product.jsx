import React, { useState, useEffect } from 'react';
import ProductList from '../componets/ProductList';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // Assuming the backend sends image data as base64 encoded strings in 'image' field
                const productsWithImages = data.map(product => ({
                    ...product,
                    image_url: `data:image/png;base64,${product.image}` // Adjust MIME type if necessary
                }));
                setProducts(productsWithImages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : products ? (
                <ProductList products={products}/>
            ) : null}
        </div>
    );
};

export default Product;
