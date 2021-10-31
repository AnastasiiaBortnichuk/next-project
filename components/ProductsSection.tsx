import Link from 'next/link';
import Products from '@components/Products';
import { IProduct, ProductTypes, updateTitle, CLICK } from '@shared';
import styles from '@styles/products.module.scss';
import { FC } from 'react';

const ProductsSection: FC<{
  products: string[];
  productProps: {
    props: Record<ProductTypes, IProduct[]>;
  };
}> = ({ products, productProps }) => {
  const { link, products__section, title } = styles;

  return (
    <>
      {products.map((product) => (
        <section className={products__section} key={product}>
          <Link href={`/category/${product}`}>
            <a className={link}>
              <span className={title}>{updateTitle(product)}</span>
              {CLICK}
            </a>
          </Link>
          <Products products={productProps[product].slice(0, 10)} />
        </section>
      ))}
    </>
  );
};

export default ProductsSection;
