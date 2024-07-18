import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputBox from '../componets/InpurBox'; // Ensure correct path
import ProductList from '../componets/ProductList'; // Assuming this component exists
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
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

  // Fetch products from backend
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
        setTimeout(() => {
          setLoading(false);
        }, 10)
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setTimeout(() => {
          setLoading(false);
        }, 10)
      }
    };

    fetchProducts();
  }, [ref]);

  const handleDelete = async (id) => {
    try {
        const response = await axios.post(`http://localhost:3000/productDelete?id=${id}`);
        alert(response.data);
        setProducts(products.filter(product => product.id !== id));
        setRef(pre => !pre);
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
    }
  };

  const handleEdit = (id) => {
    console.log('Edit product with id:', id);
    // Implement edit functionality here
  };

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Prepare form data and submit
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
        const response = await axios.post('http://localhost:3000/admin', data, {
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
        setRef(pre => !pre);
        setLoading(true);
        setFile(null);
        // Refresh product list after submission
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

  // Handle file upload
  const handleUploadImage = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        {/* Render form inputs */}
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
        {/* File upload input */}
        <label htmlFor="image">Image</label>
        <input type="file" id="image" onChange={handleUploadImage} accept="image/*" required />
        {/* Preview image */}
        {file && <img src={URL.createObjectURL(file)} alt="preview" className="w-[100px]" />}
        <br />
        {/* Submit button */}
        <button className="text-red-500" type="submit">
          Submit
        </button>
      </form>
      {/* Display success or error message */}
      {message && <p>{message}</p>}

      <div>
        <h2>Total Items</h2>
        {/* Display product list */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ProductList products={products} onDeleteClick={handleDelete} onEditClick={handleEdit}  />
        )}
      </div>
    </div>
  );
}

export default Admin;