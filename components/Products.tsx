import Product from './Product';
import { ProductsProps } from '../types/types';
import styles from '../styles/products.module.scss';

const Products = (props: ProductsProps): JSX.Element => (
  <div className={styles.grid}>
    {props.products.map((product) => (
      <Product product={product} key={product.id} {...props} />
    ))}
  </div>
);

export default Products;
