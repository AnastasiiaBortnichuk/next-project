import Product from '@components/Product';
import { IProduct } from '@shared';
import styles from '@styles/products.module.scss';
import { FC } from 'react';

const Products: FC<{ products: IProduct[] }> = ({ products }) => (
  <div className={styles.grid}>
    {products.map((product) => (
      <Product product={product} key={product.id} />
    ))}
  </div>
);

export default Products;
