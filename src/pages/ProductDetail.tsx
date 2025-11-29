import React, { useContext, useEffect, useState } from 'react';
import { fetchProductById } from '../api';
import { withRouterParams } from '../reactRouterHelpers';
import { StoreContext } from '../context/StoreContext';
import { observer } from 'mobx-react';

type Props = { params?: any };

const ProductDetailInner: React.FC<Props> = ({ params }) => {
  const store = useContext(StoreContext); 
  
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [qty, setQty] = useState<number>(1);


  useEffect(() => {
    const loadProduct = async () => {
      const id = params?.id;
      if (!id) {
        setError('Missing id');
        setLoading(false);
        return;
      }

      try {
        const p = await fetchProductById(id);
        setProduct(p);
        setLoading(false);
      } catch (e: any) {
        setError(e.message || 'Failed to load');
        setLoading(false);
      }
    };

    loadProduct();
  }, [params?.id]);

  const addToCart = () => {
    if (!product) return;
    store.add(
      { id: product.id, title: product.title, price: product.price, image: product.image },
      qty
    );
    alert('Added to cart');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', display: 'flex', gap: 20 }}>
      <div style={{ flex: '0 0 320px' }}>
        <img src={product.image} alt={product.title} style={{ maxWidth: '100%' }} />
      </div>
      <div style={{ flex: 1 }}>
        <h2>{product.title}</h2>
        <div style={{ fontWeight: 700 }}>${product.price}</div>
        <p>{product.description}</p>

        <div style={{ margin: '12px 0' }}>
          <label>
            Qty:{' '}
            <input
              type="number"
              value={qty}
              min={1}
              onChange={(e) =>
                setQty(Math.max(1, Number(e.target.value) || 1))
              }
              style={{ width: 60 }}
            />
          </label>
        </div>

        <button onClick={addToCart} style={{ padding: '8px 12px', borderRadius: 6 }}>
          Add to MyCart
        </button>
      </div>
    </div>
  );
};

export default withRouterParams(observer(ProductDetailInner));
