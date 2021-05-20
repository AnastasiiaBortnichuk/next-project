import { GetStaticProps } from 'next';
import Products from '../components/Products';
import { fetchData, ProductsProps } from '../shared';
import styles from '../styles/products.module.scss';

const Brows = (props: ProductsProps): JSX.Element => (
  <>
    <h2 className={styles.title}>Eyebrows</h2>
    <Products {...props} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchData('eyebrow');

  return {
    props: {
      products,
    },
  };
};

export default Brows;
