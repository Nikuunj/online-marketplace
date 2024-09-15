import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Linkss from './Linkss';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1, scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.4,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
  },
};

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = () => {
    setMenuOpen(pre => !pre)
  }
  const details = [
    { to: '/', name: 'Home' },
    { to: '/product', name: 'Products' },
    { to: '/about', name: 'About' },
    { to: '/contact_us', name: 'Contact Us' },
    { to: '/login', name: 'Login' },
    { to: '/sign_up', name: 'Sign Up' },
  ];

  return (
    <>
      <motion.div
        className="min-w-[100vw] bg-[#0F1035] z-50 flex flex-row justify-between container py-3 text-[21px] shadow-xl shadow-zinc-400"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="ms-4 flex justify-center items-center text-2xl" variants={item}>
          <Link to="/" className="hover:text-[#365486] duration-500 text-[#7FC7D9]">
            X-Store
          </Link>
        </motion.div>
          <motion.button
            variants={item}
            className="lg:hidden block px-4 py-2 relative  md:left-80 sm:left-60 left-24 mx-1 items-center opacity-100"
            onClick={handleChange} 
          >
            {menuOpen ? <FontAwesomeIcon icon={faTimes} className="text-slate-50" /> : <FontAwesomeIcon icon={faBars} className="text-slate-50" />}
          </motion.button>
        <div className=" relative lg:flex lg:items-center lg:opacity-100 px-6 opacity-85 text-white duration-500">
          <motion.div
            className={`lg:flex bg-slate-600 lg:bg-transparent py-4 lg:items-center absolute  lg:relative lg:top-0 top-[60px] lg:left-0 left-[-144px] transition-all duration-500 ease-in-out ${menuOpen ? 'block' : 'hidden'}`}
            variants={item}
            onClick={handleChange}
          >
            <Linkss details={details} isOpen={menuOpen} />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default Header;
