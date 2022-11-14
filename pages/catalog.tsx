import React, { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';

import Filters from '@components/Filters';
import Products from '@components/Products';
import { BASE_URL, IProduct } from '@shared';
import styles from '@styles/catalog.module.scss';

const Catalog: NextPage<{ products: IProduct[]; brands: string[] }> = ({
  products,
  brands,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([
    ...products,
  ]);

  return (
    <>
      <Filters
        products={products}
        brands={brands}
        setFilteredProducts={setFilteredProducts}
      />
      <h2 className={styles.title} data-testid="all-products">
        All our products
      </h2>
      <Products products={filteredProducts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(BASE_URL);
  const products = await res.json();

  const brands = Array.from(
    new Set(products.map((product: IProduct) => product.brand).sort())
  );

  return {
    props: {
      products,
      brands,
    },
  };
};

export default Catalog;
