import { GetStaticProps } from 'next';
import Products from '../components/Products';
import { fetchData, IProductsProps } from '../shared';
import styles from '../styles/products.module.scss';

const Brows = (props: IProductsProps): JSX.Element => (
  <>
    <p className={styles.title}>Eyebrows</p>
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
