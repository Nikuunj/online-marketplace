import React, { useEffect, useState } from 'react';
import InputBox from './InpurBox'; // Corrected typo in import
import axios from 'axios';
import Loading from './Loading';

function Edit({ id, onSubmit }) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null); // State to hold the selected file
    const [submitting, setSubmitting] = useState(false); // New state for button loading

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
                    image_url: `data:image/png;base64,${data.image}` // Adjust MIME type if necessary
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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct(prev => ({ ...prev, [id]: value }));
    };

    const handleUploadImage = (e) => {
        const imageFile = e.target.files[0];
        setFile(imageFile); // Set the selected file in state
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct(prev => ({
                    ...prev,
                    image_url: reader.result // Update image_url with base64 encoded image data
                }));
            };
            reader.readAsDataURL(imageFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true); // Set submitting state to true

        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('product_name', product.name);
            formData.append('price', product.price);
            formData.append('details', product.details);
            formData.append('company', product.company);

            // Convert file to blob
            const imageBlob = await fetch(product.image_url).then(res => res.blob());

            // Append blob to formData
            formData.append('file', imageBlob);

            const response = await axios.post('https://online-market-backend-4n5q.onrender.com/admin/productEdit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Your data has been updated');
            onSubmit();
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        } finally {
            setSubmitting(false); // Reset submitting state
        }
    };

    if (loading) {
        return (                 
        <div className='flex flex-start'>
            <Loading/>
        </div>);
    } 
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className='flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold mb-4'>Edit Product</h1>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                    <InputBox
                        id="name"
                        type="text"
                        placeholder="Product Name"
                        label="Product Name:"
                        value={product.name || ''}
                        change={handleChange}
                    />
                    <InputBox
                        id="price"
                        type="number"
                        placeholder="Price"
                        label="Price:"
                        value={product.price || ''}
                        change={handleChange}
                    />
                    <InputBox
                        id="details"
                        type="text"
                        placeholder="Details"
                        label="Details:"
                        value={product.details || ''}
                        change={handleChange}
                    />
                    <InputBox
                        id="company"
                        type="text"
                        placeholder="Company"
                        label="Company:"
                        value={product.company || ''}
                        change={handleChange}
                    />
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                    <input 
                        type="file" 
                        id="image" 
                        onChange={handleUploadImage} 
                        accept="image/*" 
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
                    />
                    {/* Preview image */}
                    {product.image_url && (
                        <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="mt-4 max-w-xs max-h-48 object-cover rounded-md" 
                        />
                    )}
                    <button
                        type="submit"
                        className={`w-full py-2 text-xl text-center bg-[#0F1035] hover:bg-transparent border-2 duration-500 border-[#0F1035] hover:underline underline-offset-4 text-[#7FC7D9] hover:text-[#365486] font-[325] ${submitting ? 'cursor-wait' : ''}`}
                        disabled={submitting} // Disable button while submitting
                    >
                        {submitting ? 'Submitting...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;