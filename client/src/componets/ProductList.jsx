import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1, 
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.7,
      },
    },
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  

function ProductList({ products, onDeleteClick, onEditClick }) {
    console.log(products); // Logs the products array passed as props

    return (
        <div className='container mx-auto px-4'>
            <div className='flex justify-center'>
                <motion.div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
                variants={container}
                initial="hidden"
                animate="visible" 
                >
                    {products.map((product) => (
                        <motion.div key={product.id} 
                        variants={item}
                        className='relative p-4 border border-gray-300 rounded duration-500 hover:bg-slate-300'>
                            <Link to={`/productDetail?id=${product.id}`} key={product.id}>
                            <div className="mb-4 p-4">
                                <p className="text-2xl font-semibold mb-[-3px]">{product.name}</p>
                                <p className="text-gray-500 mb-[-1px]">{product.company}</p>
                                <p className='text-xl mb-2'>₹{product.price}</p>
                                {product.image_url && (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-auto max-h-[200px] object-contain"
                                        onError={(e) => console.error('Error loading image:', e)}
                                    />
                                )}
                            </div>
                        </Link>
                            <div className='absolute bottom-3 right-4 flex space-x-3'>
                                <button type='button' className='text-red-600' onClick={() => onDeleteClick(product.id)}>
                                    <span className='fas fa-trash delete-icon'></span>
                                </button>
                                <button type='button' className='text-blue-600' onClick={() => onEditClick(product.id)}>
                                    <span className='fas fa-edit edit-icon'></span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

export default ProductList;
