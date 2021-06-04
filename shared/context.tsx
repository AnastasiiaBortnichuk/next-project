import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { IComponentProps } from '@shared';

const сontextDefaultValues: IComponentProps = {
  favorites: [],
  setFavorites: () => [],
  cart: [],
  setCart: () => [],
};

const AppContext = createContext<IComponentProps>(сontextDefaultValues);

export const useAppContext = (): IComponentProps => {
  return useContext(AppContext);
};

export const AppContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const value = {
    favorites,
    setFavorites,
    cart,
    setCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
