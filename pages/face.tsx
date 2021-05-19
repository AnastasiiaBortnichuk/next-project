import { GetStaticProps } from 'next';
import ProductsSection from '../components/ProductsSection';
import { ComponentProps, IProduct } from '../types/types';
import { BASE_URL } from '../types/constants';

interface IFaceProducts extends ComponentProps {
  blush: Array<IProduct>;
  bronzer: Array<IProduct>;
  foundation: Array<IProduct>;
}

const FACE_PRODUCTS = ['blush', 'bronzer', 'foundation'];

const Face = ({
  blush,
  bronzer,
  foundation,
  cart,
  setCart,
  favorites,
  setFavorites,
}: IFaceProducts) => {
  const productProps = {
    blush,
    bronzer,
    foundation,
  };
  return (
    <ProductsSection
      products={FACE_PRODUCTS}
      productProps={productProps}
      favorites={favorites}
      setFavorites={setFavorites}
      cart={cart}
      setCart={setCart}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blushResponse = await fetch(`${BASE_URL}?product_type=blush`);
  const blush = await blushResponse.json();

  const bronzerResponse = await fetch(`${BASE_URL}?product_type=bronzer`);
  const bronzer = await bronzerResponse.json();

  const foundationResponse = await fetch(`${BASE_URL}?product_type=foundation`);
  const foundation = await foundationResponse.json();

  return {
    props: {
      blush,
      bronzer,
      foundation,
    },
  };
};

export default Face;
