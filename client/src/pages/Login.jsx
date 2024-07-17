import React, { useState } from 'react';
import axios from 'axios';
import InputBox from '../componets/InpurBox'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
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
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            label: 'Password:',
            value: formData.password,
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
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            setMessage(response.data.message);
            if(response.data.admin) {
                navigate('/admin')
            } else {
                navigate('/')
            }
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

export default Login;
