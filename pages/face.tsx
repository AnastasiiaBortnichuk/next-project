import { GetStaticProps } from 'next';
import ProductsSection from '../components/ProductsSection';
import { IComponentProps, IProduct, fetchData } from '../shared';

interface IFaceProducts extends IComponentProps {
  blush: IProduct[];
  bronzer: IProduct[];
  foundation: IProduct[];
}

const FACE_PRODUCTS = ['blush', 'bronzer', 'foundation'];

const Face = ({
  blush,
  bronzer,
  foundation,
  ...props
}: IFaceProducts): JSX.Element => {
  const productProps = {
    blush,
    bronzer,
    foundation,
  };

  return (
    <ProductsSection
      products={FACE_PRODUCTS}
      productProps={productProps}
      {...props}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const blush = await fetchData('blush');
  const bronzer = await fetchData('bronzer');
  const foundation = await fetchData('foundation');

  return {
    props: {
      blush,
      bronzer,
      foundation,
    },
  };
};

export default Face;
