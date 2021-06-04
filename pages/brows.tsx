import { GetStaticProps, NextPage } from 'next';
import Products from '@components/Products';
import { IProduct, fetchData } from '@shared';
import styles from '@styles/products.module.scss';

const BrowsPage: NextPage<{ products: IProduct[] }> = ({ products }) => (
  <>
    <h2 className={styles.title}>Eyebrows</h2>
    <Products products={products} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchData<IProduct[]>('eyebrow');

  return {
    props: {
      products,
    },
  };
};

export default BrowsPage;
