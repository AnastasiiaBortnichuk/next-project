import { GetStaticProps } from 'next';
import ProductsSection from '../components/ProductsSection';
import { ComponentProps, IProduct, fetchData } from '../shared';

interface ILipsProducts extends ComponentProps {
  lipstick: IProduct[];
  lip_liner: IProduct[]; //this variable has a name with a bottom space because it must match the value of the product category that comes in response to the request
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
  const lipstick = await fetchData('lipstick');
  const lip_liner = await fetchData('lip_liner');

  return {
    props: {
      lipstick,
      lip_liner,
    },
  };
};

export default Lips;
