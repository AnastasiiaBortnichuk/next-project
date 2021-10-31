import { GetStaticProps, NextPage } from 'next';
import Products from '@components/Products';
import { fetchData, IProduct } from '@shared';
import styles from '@styles/products.module.scss';

const NailsPage: NextPage<{ products: IProduct[] }> = ({ products }) => (
  <>
    <h2 className={styles.title}>Nail Polishes</h2>
    <Products products={products} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchData<IProduct[]>('nail_polish');

  return {
    props: {
      products,
    },
  };
};

export default NailsPage;
