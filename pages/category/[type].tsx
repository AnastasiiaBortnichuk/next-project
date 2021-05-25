import { GetStaticProps, GetStaticPaths } from 'next';
import Products from '../../components/Products';
import {
  BASE_URL,
  IProductsProps,
  fetchData,
  updateTitle,
  IProduct,
} from '../../shared';
import styles from '../../styles/products.module.scss';

const ProductPage = (props: IProductsProps): JSX.Element => (
  <>
    <h2 className={styles.title}>{updateTitle(props.type)}</h2>
    <Products {...props} />
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(BASE_URL);
  const products = await res.json();

  const allPaths = products.map((product: IProduct) => ({
    params: { type: product.product_type },
  }));

  const paths = Array.from(new Set(allPaths.map(JSON.stringify))).map(
    (i: string) => JSON.parse(i)
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await fetchData(params.type);

  return {
    props: {
      products,
      type: params.type,
    },
  };
};

export default ProductPage;
