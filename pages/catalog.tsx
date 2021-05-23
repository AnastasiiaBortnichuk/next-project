import React, { useState, useMemo, Dispatch } from 'react';
import { GetStaticProps } from 'next';
import Products from '../components/Products';
import { BASE_URL, IProduct, IComponentProps } from '../shared';
import styles from '../styles/catalog.module.scss';

interface ICatalogProps extends IComponentProps {
  products: IProduct[];
  brands: string[];
}

const Catalog = ({ products, brands, ...props }: ICatalogProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [filterBrand, setBrand] = useState<string | undefined>();

  const handleChange =
    (setState: Dispatch<string>) =>
    (event: React.ChangeEvent<EventTarget>): void => {
      let target = event.target as HTMLInputElement | HTMLSelectElement;
      setState(target.value);
    };

  const searchedProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );

  const productsByBrand = useMemo(() => {
    switch (filterBrand) {
      case 'all':
      case undefined: //"null" and "undefined" value may come in response from request
      case null:
        return searchedProducts;
      default:
        return [...searchedProducts].filter((product) => product.brand === filterBrand);
    }
  }, [searchedProducts, filterBrand]);

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.filter_group}>
          <p className={styles.selection}>Sort by</p>
          <select className={styles.options} onBlur={handleChange(setBrand)}>
            <option value="all">choose brand</option>
            {brands.map(
              (brand) =>
                brand && (
                  <option value={brand} id={brand} key={brand}>
                    {brand}
                  </option>
                )
            )}
          </select>
        </div>
        <div className={styles.filter_group}>
          <div className={styles.search}>
            <input
              className={styles.search_input}
              type="search"
              value={query}
              placeholder="Search by name"
              onChange={handleChange(setQuery)}
            />
          </div>
        </div>
      </div>
      <p className={styles.title}>All our products</p>
      <Products products={productsByBrand} {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(BASE_URL);
  const products = await res.json();

  const brands = Array.from(new Set(products.map((product: IProduct) => product.brand).sort()));

  return {
    props: {
      products,
      brands,
    },
  };
};

export default Catalog;
