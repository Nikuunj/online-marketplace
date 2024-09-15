import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.75,
      staggerChildren: 0.4,
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

function Linkss({ details, isOpen }) {
  const render = details.map((val, index) => {
    if (val.name === 'About' || val.name === 'Contact Us') {
      return (
        <motion.span className='items' variants={item} key={index}>
          <a
            href='#footer'
            className='mx-5 hover:text-[#365486] hover:underline underline-offset-4 duration-500 text-[#7FC7D9]'
          >
            {val.name}
          </a>
        </motion.span>
      );
    }
    return (
      <motion.span className='items' variants={item} key={index}>
        <Link
          to={val.to}
          className='mx-5 hover:text-[#365486] hover:underline underline-offset-4 duration-500 text-[#7FC7D9]'
        >
          {val.name}
        </Link>
      </motion.span>
    );
  });

  return (
    <motion.div
      className={`${
        isOpen ? 'flex' : 'hidden'
      } lg:flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 w-48 justify-center duration-500 lg:w-auto items-center`}
      variants={container}
      initial='hidden'
      animate='visible'
    >
      {render}
    </motion.div>
  );
}

export default Linkss;
