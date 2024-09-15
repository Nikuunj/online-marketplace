import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './componets/Header';
import Footer from './componets/Footer';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

function App() {
  const Layout = () => {
    return (
      <div className='m-0 p-0 bg-[#DCF2F1] select-none min-h-screen flex flex-col overflow-hidden'>
        <div className='sticky top-0 z-50'>
        <Header />
        </div>
        <div className="flex-grow overflow-hidden">
          <Outlet />
        </div>
        <div className='block'>
        <Footer />
        </div>
        <Analytics />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/about', element: <About /> },
        { path: '/contact_us', element: <ContactUs /> },
        { path: '/login', element: <Login /> },
        { path: '/sign_up', element: <SignUp /> },
        { path: '/admin', element: <Admin /> },
        { path: '/product', element: <Product /> },
        { path: '/productDetail', element: <ProductDetail /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
