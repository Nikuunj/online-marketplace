import React, { useEffect, useRef } from 'react';
import img1 from '../assets/home-1.jpeg';
import img2 from '../assets/home-2.jpeg';
import img3 from '../assets/home-3.jpeg';
import img4 from '../assets/home-4.jpeg';
import img5 from '../assets/home-5.jpeg';
import img6 from '../assets/home-6.jpeg';
import img7 from '../assets/home-7.jpeg';
import img8 from '../assets/home-8.jpeg';

function Images() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  const scrollRef = useRef(null);
  const autoScrollInterval = useRef(null);

  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({
            left: 300,
            behavior: 'smooth',
          });

          // Loop back to the start if at the end
          if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth) {
            scrollRef.current.scrollTo({
              left: 0,
              behavior: 'smooth',
            });
          }
        }
      }, 2000); // Adjust the interval time as needed
    };

    startAutoScroll();

    return () => clearInterval(autoScrollInterval.current);
  }, []);

  const handleTouchStart = () => {
    clearInterval(autoScrollInterval.current);
  };

  const handleTouchEnd = () => {
    autoScrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: 300,
          behavior: 'smooth',
        });

        if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth) {
          scrollRef.current.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    }, 2000);
  };

  const renderImages = images.map((img, index) => (
    <div className="snap-center flex-shrink-0 w-80 h-80 lg:w-96 lg:h-96 bg-transparent rounded-xl " key={index}>
      <img src={img} alt={`image-${index}`} className="lg:h-full lg:w-full lg:ms-0  ms-12 w-[70%] shadow-xl shadow-slate-600 rounded-lg h-[60%] lg:mt-0 mt-10 p-0 object-cover" />
    </div>
  ));

  return (
    <div
      ref={scrollRef}
      className="snap-x overflow-x-scroll flex lg:space-x-8 space-x-1 bg-transparent  w-full scrollbar-none m-0 p-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {renderImages}
    </div>
  );
}

export default Images;
