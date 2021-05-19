import { GetStaticProps } from 'next';
import ProductsSection from '../components/ProductsSection';
import { ComponentProps, IProduct } from '../types/types';
import { BASE_URL } from '../types/constants';

interface ILipsProducts extends ComponentProps {
  lipstick: Array<IProduct>;
  lip_liner: Array<IProduct>; //this variable has a name with a bottom space because it must match the value of the product category that comes in response to the request
}

const LIPS_PRODUCTS = ['lipstick', 'lip_liner'];

const Lips = ({ lipstick, lip_liner, cart, setCart, favorites, setFavorites }: ILipsProducts) => {
  const productProps = {
    lipstick,
    lip_liner,
  };
  return (
    <ProductsSection
      products={LIPS_PRODUCTS}
      productProps={productProps}
      favorites={favorites}
      setFavorites={setFavorites}
      cart={cart}
      setCart={setCart}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const lipstickResponse = await fetch(`${BASE_URL}?product_type=lipstick`);
  const lipstick = await lipstickResponse.json();

  const liplinerResponse = await fetch(`${BASE_URL}?product_type=lip_liner`);
  const lip_liner = await liplinerResponse.json();

  return {
    props: {
      lipstick,
      lip_liner,
    },
  };
};

export default Lips;
