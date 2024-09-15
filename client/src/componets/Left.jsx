import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1, 
    scale: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
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

function Left() {
  const text = 'Explore our new arrivals to find the perfect pieces that blend modern style with timeless elegance. Shop now and elevate your wardrobe for the season.';
  const [blue, setBlue] = useState(true);
  setTimeout(() => {
    setBlue(pre => !pre)
  }, 1000)
  useEffect(() => {
    setTimeout(() => {
      setBlue(pre => !pre)
    }, 1000)
  }, [blue])
  const wordsArray = text.split(' ');

  const render = wordsArray.map((tx, index) => {
    if(index > 0) {
      return (
        <motion.span
        className={`font-[350] item ${index % 2 === 0 ? (blue ? 'text-[#64CCC5]' : 'text-[#053B50]') : (!blue ? 'text-[#64CCC5]' : 'text-[#053B50]')} duration-[400ms]`}
        variants={item}
        >
        {' '}{tx}
        </motion.span>
      )
    }
    return(
      <motion.span
      className={`text-[100px] font-thin leading-none item ${index % 2 === 0 ? (blue ? 'text-[#64CCC5]' : 'text-[#053B50]') : (!blue ? 'text-[#64CCC5]' : 'text-[#053B50]')} duration-[400ms]`}
      variants={item}
      >{tx}</motion.span>
    )
});

  return (
    <motion.div variants={item}>

      <motion.div
        className="container text-3xl lg:h-full h-1/2 flex flex-col items-center justify-center p-4 my-14 lg:my-0 "
        variants={container}
        initial="hidden"
        animate="visible" 
        >
      
        <div className='select-none'>
          {render}
        </div>
        <div>
          <Link to='/product' className='w-[100%]'>
            <motion.div className='item w-80 py-2 mt-16 text-center bg-[#0F1035] hover:bg-transparent border-2 duration-500	border-[#0F1035] hover:underline underline-offset-4 text-[#7FC7D9] hover:text-[#365486] font-[325]'
            variants={item}
            >
              Shoping
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Left;
