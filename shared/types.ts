import { Dispatch, SetStateAction } from 'react';

//"null" value may come in response from request
type API_STRING_MOCK = string | null;

export interface IProduct {
  api_featured_image: string;
  brand: API_STRING_MOCK;
  currency: API_STRING_MOCK;
  description: string;
  id: number;
  image_link: string;
  name: string;
  price: string;
  price_sign: API_STRING_MOCK;
  product_api_url: string;
  product_colors: { hex_value: string; colour_name: string }[];
  product_link: string;
  product_type: string;
  rating: number | null;
}

export interface IComponentProps {
  cart: IProduct[];
  setCart: Dispatch<SetStateAction<IProduct[]>>;
  favorites: IProduct[];
  setFavorites: Dispatch<SetStateAction<IProduct[]>>;
}

export type ProductTypes =
  | 'mascara'
  | 'eyeliner'
  | 'eyeshadow'
  | 'blush'
  | 'bronzer'
  | 'foundation'
  | 'lipstick'
  | 'lip_liner';
