import Product from './Product';
import { ProductsProps } from '../shared';
import styles from '../styles/products.module.scss';

const Products = ({ products, ...props }: ProductsProps): JSX.Element => (
  <div className={styles.grid}>
    {products.map((product) => (
      <Product product={product} key={product.id} {...props} />
    ))}
  </div>
);

export default Products;
