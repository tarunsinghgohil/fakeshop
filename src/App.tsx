import React from 'react';
import { Routes, Route, Link, useSearchParams } from 'react-router-dom';
import HomeWrapper from './pages/Home';
import ProductDetailWrapper from './pages/ProductDetail';
import CartPageWrapper from './pages/CartPage';
import Footer from './components/Footer';

function AppInner() {
  const [sp] = useSearchParams();
  const search = sp.toString();
  return (
    <div style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <header style={{
        background:'#fff', borderBottom:'1px solid #e5e7eb', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'
      }}>
        <div style={{fontWeight:700, fontSize:18}}>Shop</div>
        <nav aria-label="Main navigation">
          <Link to="/" style={{marginRight:12}}>Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      <main style={{flex:1,padding:16}}>
        <Routes>
          <Route path='/' element={<HomeWrapper search={search} />} />
          <Route path='/product/:id/details' element={<ProductDetailWrapper />} />
          <Route path='/cart' element={<CartPageWrapper />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default AppInner;
