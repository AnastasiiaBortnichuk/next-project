import { GetStaticProps, NextPage } from 'next';
import ProductsSection from '@components/ProductsSection';
import { IProduct, ProductTypes, fetchData } from '@shared';

const EYES_PRODUCTS = ['mascara', 'eyeliner', 'eyeshadow'];

const EyesPage: NextPage<{ props: Record<ProductTypes, IProduct[]> }> = (
  props
) => <ProductsSection products={EYES_PRODUCTS} productProps={props} />;

export const getStaticProps: GetStaticProps = async () => {
  const [mascara, eyeliner, eyeshadow] = await Promise.all(
    EYES_PRODUCTS.map((product) => fetchData<IProduct[]>(product))
  );

  return {
    props: {
      mascara,
      eyeliner,
      eyeshadow,
    },
  };
};

export default EyesPage;
