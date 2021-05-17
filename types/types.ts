export interface IProduct {
  api_featured_image: string;
  brand: string | null;
  currency: string | null;
  description: string;
  id: number;
  image_link: string;
  name: string;
  price: string;
  price_sign: string | null;
  product_api_url: string;
  product_colors: Array<{hex_value: string, colour_name: string}>;
  product_link: string;
  product_type: string;
  rating: number | null;
};