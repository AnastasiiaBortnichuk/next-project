import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Filters from '@components/Filters';
import Products from '@components/Products';
import { BASE_URL, updateTitle, IProduct, fetchData } from '@shared';
import styles from '@styles/products.module.scss';
import { useState } from 'react';

const CategoryPage: NextPage<{
  products: IProduct[];
  type: string;
  brands: string[];
}> = ({ products, type, brands }) => {
  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);

  return (
    <>
      <Filters
        products={products}
        brands={brands}
        setFilteredProducts={setFilteredProducts}
      />
      <h2 className={styles.title}>{updateTitle(type)}</h2>
      <Products products={filteredProducts} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(BASE_URL);
  const products = await res.json();

  const allPaths = products.map((product: IProduct) => ({
    params: { type: product.product_type },
  }));

  const paths = Array.from(new Set(allPaths.map(JSON.stringify))).map(
    (i: string) => JSON.parse(i)
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const products = await fetchData<IProduct[]>(params.type);

  const brands = Array.from(
    new Set(products.map((product: IProduct) => product.brand).sort())
  );

  return {
    props: {
      products,
      type: params.type,
      brands,
    },
  };
};

export default CategoryPage;
