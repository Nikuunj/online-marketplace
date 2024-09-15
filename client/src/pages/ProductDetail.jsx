import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../componets/Loading';

function ProductDetail() {
  const searchParams = new URLSearchParams(useLocation().search);
  const id = searchParams.get('id');

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://online-market-backend-4n5q.onrender.com/products/${id}`);
        // const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const productWithImage = {
          ...data,
          image_url: `data:image/png;base64,${data.image}`, // Adjust MIME type if necessary
        };
        setProduct(productWithImage);
        setTimeout(() => {
          setLoading(false);
        }, 700);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (                 
    <div className='flex flex-start'>
        <Loading/>
    </div>);
  } 
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 z-0">
      <div className="bg-[#DCF2F1] shadow-lg rounded-lg p-6 w-full max-w-4xl overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="flex flex-col justify-center items-center mb-6 shadow-xl">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-semibold mb-2">{product.name}</h1>
            <p className="text-xl font-semibold text-gray-600 mb-2">{product.company}</p>
            <p className="text-2xl font-bold text-green-600 mb-4">Price: ₹{product.price}</p>
            <p className="text-lg text-gray-800 mb-4">{product.details}</p>
            <button className=" max-w-sm w-full py-2 text-xl text-center bg-[#0F1035] hover:bg-transparent border-2 duration-500 border-[#0F1035] hover:underline underline-offset-4 text-[#7FC7D9] hover:text-[#365486] font-[350]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

