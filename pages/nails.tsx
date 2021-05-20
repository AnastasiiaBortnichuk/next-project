import { GetStaticProps } from 'next';
import Products from '../components/Products';
import { fetchData, ProductsProps } from '../shared';
import styles from '../styles/products.module.scss';

const Nails = (props: ProductsProps) => (
  <>
    <h2 className={styles.title}>Nail Polishes</h2>
    <Products {...props} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchData('nail_polish');

  return {
    props: {
      products,
    },
  };
};

export default Nails;
