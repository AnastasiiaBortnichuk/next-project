import { GetStaticProps, NextPage } from 'next';
import ProductsSection from '@components/ProductsSection';
import { IProduct, ProductTypes, fetchData } from '@shared';

const FACE_PRODUCTS = ['blush', 'bronzer', 'foundation'];

const FacePage: NextPage<{ props: Record<ProductTypes, IProduct[]> }> = (
  props
) => <ProductsSection products={FACE_PRODUCTS} productProps={props} />;

export const getStaticProps: GetStaticProps = async () => {
  const [blush, bronzer, foundation] = await Promise.all(
    FACE_PRODUCTS.map((product) => fetchData<IProduct[]>(product))
  );

  return {
    props: {
      blush,
      bronzer,
      foundation,
    },
  };
};

export default FacePage;
