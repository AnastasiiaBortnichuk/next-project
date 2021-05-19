import Link from 'next/link';
import Products from '../components/Products';
import { ComponentProps } from '../types/types';
import styles from '../styles/products.module.scss';

interface IProductsSection extends ComponentProps {
  products: Array<string>;
  productProps: any;
}

const ProductsSection = ({
  products,
  productProps,
  cart,
  setCart,
  favorites,
  setFavorites,
}: IProductsSection) => (
  <>
    {products.map((product) => (
      <section className={styles.product__section} key={product}>
        <Link href={`/category/${product}`}>
          <a className={styles.link}>
            <span className={styles.title}>{product}</span> click to view all
          </a>
        </Link>
        <Products
          products={productProps[product].slice(0, 10)}
          favorites={favorites}
          setFavorites={setFavorites}
          cart={cart}
          setCart={setCart}
        />
      </section>
    ))}
  </>
);

export default ProductsSection;
