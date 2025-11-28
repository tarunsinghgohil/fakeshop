import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { observer } from 'mobx-react';

const FooterInner: React.FC = () => {
  const store = useContext(StoreContext as any);
  return (
    <footer style={{borderTop:'1px solid #e5e7eb', padding:12, background:'#fff'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:980, margin:'0 auto'}}>
        <div>Shop</div>
        <div>Items: {store.totalItems} — Total: ${store.totalValue.toFixed(2)}</div>
      </div>
    </footer>
  );
}

export default observer(FooterInner);
