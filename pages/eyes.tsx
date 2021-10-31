import { GetStaticProps, NextPage } from 'next';
import ProductsSection from '@components/ProductsSection';
import { IProduct, ProductTypes, fetchData } from '@shared';

const EYES_PRODUCTS = ['mascara', 'eyeliner', 'eyeshadow'];

const EyesPage: NextPage<{ props: Record<ProductTypes, IProduct[]> }> = (
  props
) => <ProductsSection products={EYES_PRODUCTS} productProps={props} />;

export const getStaticProps: GetStaticProps = async () => {
  const mascara = await fetchData<IProduct[]>('mascara');
  const eyeliner = await fetchData<IProduct[]>('eyeliner');
  const eyeshadow = await fetchData<IProduct[]>('eyeshadow');

  return {
    props: {
      mascara,
      eyeliner,
      eyeshadow,
    },
  };
};

export default EyesPage;
