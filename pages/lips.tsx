import { GetStaticProps, NextPage } from 'next';
import ProductsSection from '@components/ProductsSection';
import { IProduct, ProductTypes, fetchData } from '@shared';

const LIPS_PRODUCTS = ['lipstick', 'lip_liner'];
//'lip_liner' variable has a name with underscore because it must match
//the value of the product category that comes in response to the request

const LipsPage: NextPage<{ props: Record<ProductTypes, IProduct[]> }> = (
  props
) => <ProductsSection products={LIPS_PRODUCTS} productProps={props} />;

export const getStaticProps: GetStaticProps = async () => {
  const [lipstick, lip_liner] = await Promise.all(
    LIPS_PRODUCTS.map((product) => fetchData<IProduct[]>(product))
  );

  return {
    props: {
      lipstick,
      lip_liner,
    },
  };
};

export default LipsPage;
