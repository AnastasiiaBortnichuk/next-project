import Link from 'next/link';
import Products from '../components/Products';
import { IComponentProps, IProductTypes, updateTitle } from '../shared';
import styles from '../styles/products.module.scss';

interface IProductsSection extends IComponentProps {
  products: string[];
  productProps: IProductTypes;
}

const CLICK = 'click to view all';

const ProductsSection = ({
  products,
  productProps,
  ...prop
}: IProductsSection): JSX.Element => {
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
          <Products products={productProps[product].slice(0, 10)} {...prop} />
        </section>
      ))}
    </>
  );
};

export default ProductsSection;
