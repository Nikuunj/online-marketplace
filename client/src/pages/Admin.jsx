import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputBox from '../componets/InpurBox'; // Ensure correct path
import ProductList from '../componets/ProductList'; // Assuming this component exists
import { useNavigate } from 'react-router-dom';
import Edit from '../componets/Edit';
import Loading from '../componets/Loading';

function Admin() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [file, setFile] = useState(null);
  const [ref, setRef] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    details: '',
    company: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://online-market-backend-4n5q.onrender.com/products');
        // const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const productsWithImages = data.map(product => ({
          ...product,
          image_url: `data:image/png;base64,${product.image}`
        }));
        setProducts(productsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setTimeout(() => {
          setLoading(false);
        }, 900);
      }
    };

    fetchProducts();
  }, [ref, edit]);

  const handleDelete = async (id) => {
    try {
      // Make sure the endpoint is correct and accessibl
      // const response = await axios.post(`http://localhost:3000/admin/productDelete`, { id });
      const response = await axios.post(`https://online-market-backend-4n5q.onrender.com0/admin/productDelete`, { id });
      // Check the response data
      if (response.data.message) {
        alert(response.data.message);
        setProducts(products.filter(product => product.id !== id));
        setRef(prev => !prev);
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product with error');
    }
  };

  const handleEdit = (id) => {
    setEdit(prev => !prev);
    setId(id);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please upload a file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const arrayBuffer = reader.result;
      const blob = new Blob([arrayBuffer], { type: file.type });

      const data = new FormData();
      data.append('file', blob);
      data.append('product_name', formData.product_name);
      data.append('price', formData.price);
      data.append('details', formData.details);
      data.append('company', formData.company);

      try {
        const response = await axios.post('https://online-market-backend-4n5q.onrender.com/admin', data, {
        // const response = await axios.post('http://localhost:3000/admin', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage(response.data.message);
        alert('Your data updated');
        setFormData({
          product_name: '',
          price: '',
          details: '',
          company: '',
        });
        setError(null);
        setRef(prev => !prev);
        setLoading(true);
        setFile(null);
        setTimeout(() => {
          setMessage('');
        }, 5000);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.error);
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUploadImage = (e) => {
    setFile(e.target.files[0]);
  };

  if (edit) {
    return <Edit id={id} onSubmit={handleEdit} />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-5xl text-center mb-5">Admin Panel</p>
      <form onSubmit={handleSubmit} className=" space-y-4 flex flex-col items-center">
        {Object.keys(formData).map((key) => (
          <InputBox
            key={key}
            id={key}
            type="text"
            placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ') + ':'}
            value={formData[key]}
            change={handleChange}
          />
        ))}
        <div className="flex flex-col items-start space-y-4">
        <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image:</label>
        <input 
          type="file" 
          id="image" 
          onChange={handleUploadImage} 
          accept="image/*" 
          required 
          className="block w-full px-4 py-3 mt-2 text-gray-700 duration-300 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#365486] hover:bg-gray-300 hover:border-gray-300 focus:border-[#365486]"
        />
          {file && <img src={URL.createObjectURL(file)} alt="preview" className="w-24 mt-4 my-2 border border-gray-300 rounded-md shadow-md" />}
        </div>

        <button className="item w-80 py-2 mt-16 text-xl  text-center bg-[#0F1035] hover:bg-transparent border-2 duration-500	border-[#0F1035] hover:underline underline-offset-4 text-[#7FC7D9] hover:text-[#365486] font-[325]" type="submit">
          Submit
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Total Items</h2>
        {loading ? (
          <div className='flex justify-start'>
            <Loading/>
          </div>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : (
          <ProductList products={products} onDeleteClick={handleDelete} onEditClick={handleEdit} />
        )}
      </div>
    </div>
  );
}

export default Admin;