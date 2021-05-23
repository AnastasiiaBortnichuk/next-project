import { GetStaticProps } from 'next';
import ProductsSection from '../components/ProductsSection';
import { IComponentProps, IProduct, fetchData } from '../shared';

interface IEyesProducts extends IComponentProps {
  mascara: IProduct[];
  eyeliner: IProduct[];
  eyeshadow: IProduct[];
}

const EYES_PRODUCTS = ['mascara', 'eyeliner', 'eyeshadow'];

const Eyes = ({ mascara, eyeliner, eyeshadow, ...props }: IEyesProducts): JSX.Element => {
  const productProps = { mascara, eyeliner, eyeshadow };

  return <ProductsSection products={EYES_PRODUCTS} productProps={productProps} {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const mascara = await fetchData('mascara');
  const eyeliner = await fetchData('eyeliner');
  const eyeshadow = await fetchData('eyeshadow');

  return {
    props: {
      mascara,
      eyeliner,
      eyeshadow,
    },
  };
};

export default Eyes;
