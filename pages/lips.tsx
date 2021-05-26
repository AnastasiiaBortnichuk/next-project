import { GetStaticProps } from 'next';
import ProductsSection from '../components/ProductsSection';
import { IComponentProps, IProduct, fetchData } from '../shared';

interface ILipsProducts extends IComponentProps {
  lipstick: IProduct[];
  //this variable has a name with underscore because it must match
  //the value of the product category that comes in response to the request
  lip_liner: IProduct[];
}

const LIPS_PRODUCTS = ['lipstick', 'lip_liner'];

const Lips = ({
  lipstick,
  lip_liner,
  ...props
}: ILipsProducts): JSX.Element => {
  const productProps = {
    lipstick,
    lip_liner,
  };

  return (
    <ProductsSection
      products={LIPS_PRODUCTS}
      productProps={productProps}
      {...props}
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
