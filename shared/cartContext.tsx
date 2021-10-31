import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { IProduct } from '@shared';

type CartContextT = {
  cart: IProduct[];
  setCart: Dispatch<SetStateAction<IProduct[]>>;
};

const cartContextDefaultValues: CartContextT = {
  cart: [],
  setCart: () => [],
};

const CartContext = createContext<CartContextT>(cartContextDefaultValues);

export const useCartContext = (): CartContextT => {
  return useContext(CartContext);
};

export const CartContextProvider: FC = ({ children }) => {
  const [cart, setCart] = useState([]);

  const value = {
    cart,
    setCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
