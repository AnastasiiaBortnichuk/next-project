import Product from './Product';
import { IProductsProps } from '../shared';
import styles from '../styles/products.module.scss';

const Products = ({ products, ...props }: IProductsProps): JSX.Element => (
  <div className={styles.grid}>
    {products.map((product) => (
      <Product product={product} key={product.id} {...props} />
    ))}
  </div>
);

export default Products;
