import React from 'react';
import Images from './Images';
import { motion } from 'framer-motion';

  
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function Right() {
  return (
    <motion.div className="p-4 flex items-center justify-center lg:h-full h-1/2 " variants={item}>
      <Images />  
    </motion.div>
  );
}

export default Right;
