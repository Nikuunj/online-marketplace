import React, { useState } from 'react';
import axios from 'axios';
import InputBox from '../componets/InpurBox'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const form = [
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
        setLoading(true);
        try {
            const response = await axios.post('https://online-market-backend-4n5q.onrender.com/auth/login', formData);
            // const response = await axios.post('http://localhost:3000/auth/login', formData);
            setMessage(response.data.message);
            if (response.data.admin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.error);
                alert('Incorrect email or password.')
            } else {
                setMessage('Network error');
                alert('Network error')
            }
        } finally {
            // alert(message);
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

export default Login;