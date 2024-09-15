import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputBox from '../componets/InpurBox'; // Ensure this path is correct

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_pass: '',
  });
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const form = [
    {
      id: 'username',
      type: 'text',
      placeholder: 'Username',
      label: 'Username:',
      value: formData.username,
    },
    {
      id: 'email',
      type: 'email',
      placeholder: 'Email',
      label: 'Email:',
      value: formData.email,
    },
    {
      id: 'password',
      type: 'password',
      placeholder: 'Password',
      label: 'Password:',
      value: formData.password,
    },
    {
      id: 'confirm_pass',
      type: 'password',
      placeholder: 'Confirm Password',
      label: 'Confirm Password:',
      value: formData.confirm_pass,
    },
  ];

  const render = form.map(tag => (
    <InputBox
      key={tag.id}
      id={tag.id}
      type={tag.type}
      placeholder={tag.placeholder}
      label={tag.label}
      value={tag.value}
      change={handleChange}
    />
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_pass) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://online-market-backend-4n5q.onrender.com/auth/signup', {
      // const response = await axios.post('http://localhost:3000/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setMessage(response.data.message);
      navigate('/'); // Navigate to home or another route on successful signup
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
        alert('User alredy registered')
      } else {
        setMessage('Network error');
        alert('Netowrk error')
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-[80vh] flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md space-y-4'>
        {render}
        <button
          className="w-full py-2 text-xl text-center bg-[#0F1035] hover:bg-transparent border-2 duration-500 border-[#0F1035] hover:underline underline-offset-4 text-[#7FC7D9] hover:text-[#365486] font-[325]"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {message && <p className="text-center mt-4">{message}</p>}
      </form>
    </div>
  );
}

export default SignUp;
