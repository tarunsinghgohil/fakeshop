import React from 'react';
import { cartStore as store } from '../stores/CartStore';

export const StoreContext = React.createContext(store);

export const StoreProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
