import React from 'react'
import { useLocation } from 'react-router-dom';



function ProductDetail() {
  const searchParams = new URLSearchParams(useLocation().search);
  const name = searchParams.get('id');
  
  return (
    <>
    <div>ProductDetail</div>
    <p>{name}</p>
    </>
  )
}

export default ProductDetail;