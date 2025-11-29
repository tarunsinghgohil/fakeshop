import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../context/StoreContext';

const CartPage: React.FC = () => {
  const store = useContext(StoreContext);

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <h2>My Cart</h2>
      {store.items.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div>
          {store.items.map((it: any) => (
            <div
              key={it.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 8,
                borderBottom: '1px solid #eee',
              }}
            >
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <img src={it.image} style={{ height: 50 }} alt={it.title} />
                <div>
                  <div>{it.title}</div>
                  <div>
                    ${it.price} × {it.qty}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => store.remove(it.id)}
                  style={{ padding: '6px 8px' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'right', marginTop: 12 }}>
            Total: <strong>${store.totalValue.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(CartPage);
