import { GetStaticProps, GetStaticPaths } from 'next';
import Products from '../../components/Products';
import { ProductsProps } from '../../types/types';
import { BASE_URL } from '../../types/constants';
import styles from '../../styles/products.module.scss';

const ProductPage = (props: ProductsProps): JSX.Element => {
  return (
    <>
      <h2 className={styles.title}>{props.type}</h2>
      <Products {...props} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(BASE_URL);
  const products = await res.json();

  const allPaths = products.map((product) => ({
    params: { type: product.product_type },
  }));

  const paths = Array.from(new Set(allPaths.map(JSON.stringify))).map((i: string) => JSON.parse(i));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${BASE_URL}?product_type=${params.type}`);
  const products = await res.json();

  return {
    props: {
      products,
      type: params.type,
    },
  };
};

export default ProductPage;
