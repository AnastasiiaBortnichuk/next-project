import { GetStaticProps } from 'next';
import ProductsSection from '../components/ProductsSection';
import { ComponentProps, IProduct } from '../types/types';
import { BASE_URL } from '../types/constants';

interface IEyesProducts extends ComponentProps {
  mascara: Array<IProduct>;
  eyeliner: Array<IProduct>;
  eyeshadow: Array<IProduct>;
}

const EYES_PRODUCTS = ['mascara', 'eyeliner', 'eyeshadow'];

const Eyes = ({
  mascara,
  eyeliner,
  eyeshadow,
  cart,
  setCart,
  favorites,
  setFavorites,
}: IEyesProducts) => {
  const productProps = {
    mascara,
    eyeliner,
    eyeshadow,
  };
  return (
    <ProductsSection
      products={EYES_PRODUCTS}
      productProps={productProps}
      favorites={favorites}
      setFavorites={setFavorites}
      cart={cart}
      setCart={setCart}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${BASE_URL}?product_type=mascara`);
  const mascara = await res.json();

  const res2 = await fetch(`${BASE_URL}?product_type=eyeliner`);
  const eyeliner = await res2.json();

  const res3 = await fetch(`${BASE_URL}?product_type=eyeshadow`);
  const eyeshadow = await res3.json();

  return {
    props: {
      mascara,
      eyeliner,
      eyeshadow,
    },
  };
};

export default Eyes;
