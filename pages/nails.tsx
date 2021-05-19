import { GetStaticProps } from 'next';
import Products from '../components/Products';
import { ProductsProps } from '../types/types';
import { BASE_URL } from '../types/constants';
import styles from '../styles/products.module.scss';

const Nails = (props: ProductsProps) => (
  <>
    <h2 className={styles.title}>Nail Polishes</h2>
    <Products {...props} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${BASE_URL}?product_type=nail_polish`);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};

export default Nails;
