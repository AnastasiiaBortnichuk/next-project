import { GetStaticProps, NextPage } from 'next';
import ProductsSection from '@components/ProductsSection';
import { IProduct, ProductTypes, fetchData } from '@shared';

const FACE_PRODUCTS = ['blush', 'bronzer', 'foundation'];

const FacePage: NextPage<{ props: Record<ProductTypes, IProduct[]> }> = (
  props
) => <ProductsSection products={FACE_PRODUCTS} productProps={props} />;

export const getStaticProps: GetStaticProps = async () => {
  const blush = await fetchData<IProduct[]>('blush');
  const bronzer = await fetchData<IProduct[]>('bronzer');
  const foundation = await fetchData<IProduct[]>('foundation');

  return {
    props: {
      blush,
      bronzer,
      foundation,
    },
  };
};

export default FacePage;
