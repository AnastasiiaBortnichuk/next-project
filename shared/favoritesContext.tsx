import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { IProduct } from '@shared';

type FavoritesContextT = {
  favorites: IProduct[];
  setFavorites: Dispatch<SetStateAction<IProduct[]>>;
};

const favoritesContextDefaultValues: FavoritesContextT = {
  favorites: [],
  setFavorites: () => [],
};

const FavoritesContext = createContext<FavoritesContextT>(
  favoritesContextDefaultValues
);

export const useFavoritesContext = (): FavoritesContextT => {
  return useContext(FavoritesContext);
};

export const FavoritesContextProvider: FC = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const value = {
    favorites,
    setFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
