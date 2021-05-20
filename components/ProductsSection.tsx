import Link from 'next/link';
import Products from '../components/Products';
import { ComponentProps, ProductTypes, updateTitle } from '../shared';
import styles from '../styles/products.module.scss';

interface IProductsSection extends ComponentProps {
  products: string[];
  productProps: ProductTypes;
}

const CLICK = 'click to view all';

const ProductsSection = ({ products, productProps, ...prop }: IProductsSection) => (
  <>
    {products.map((product) => (
      <section className={styles.product__section} key={product}>
        <Link href={`/category/${product}`}>
          <a className={styles.link}>
            <span className={styles.title}>{updateTitle(product)}</span>
            {CLICK}
          </a>
        </Link>
        <Products products={productProps[product].slice(0, 10)} {...prop} />
      </section>
    ))}
  </>
);

export default ProductsSection;
