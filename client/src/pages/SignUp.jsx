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

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setMessage(response.data.message);
      navigate('/'); // Navigate to home or another route on successful signup
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Network error');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {render}
        <button className='text-red-500' type='submit'>
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignUp;
