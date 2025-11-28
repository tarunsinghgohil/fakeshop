import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({product}:{product:any}){
  return (
    <div style={{border:'1px solid #e5e7eb', borderRadius:8, padding:12, background:'#fff'}}>
      <Link to={`/product/${product.id}/details`} aria-label={product.title}>
        <div style={{height:140, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
          <img src={product.image} alt={product.title} style={{maxHeight:'100%', maxWidth:'100%'}}/>
        </div>
        <h3 style={{fontSize:14, margin:'8px 0'}}>{product.title}</h3>
        <div style={{fontWeight:700}}>${product.price}</div>
      </Link>
    </div>
  );
}
