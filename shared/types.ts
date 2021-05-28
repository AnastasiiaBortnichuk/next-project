import { Dispatch, SetStateAction } from 'react';

type API_STRING_MOCK = string | null;

export interface IProduct {
  //"null" value may come in response from request
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

export interface IProductComponentProps extends IComponentProps {
  product: IProduct;
}

export interface IProductsProps extends IComponentProps {
  products: IProduct[];
  type?: string;
}

export interface IProductTypes {
  mascara?: IProduct[];
  eyeliner?: IProduct[];
  eyeshadow?: IProduct[];
  blush?: IProduct[];
  bronzer?: IProduct[];
  foundation?: IProduct[];
  lipstick?: IProduct[];
  //this variable has a name with underscore because it must match
  //the value of the product category that comes in response to the request
  lip_liner?: IProduct[];
}

type ProductTypes =
  | 'mascara'
  | 'eyeliner'
  | 'eyeshadow'
  | 'blush'
  | 'bronzer'
  | 'foundation'
  | 'lipstick'
  | 'lip_liner';

export let products: Record<ProductTypes, IProduct>;
