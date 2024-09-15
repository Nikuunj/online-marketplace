import React from 'react';
import Left from '../componets/Left';
import Right from '../componets/Right';
import { motion } from 'framer-motion';

function HomePage() {
  const container = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <motion.div className='lg:grid lg:grid-cols-2 md:h-[88vh]'  
      variants={container}
      initial="hidden"
      animate="visible" >
      <Left />
      <Right />
    </motion.div>
  );
}

export default HomePage;
