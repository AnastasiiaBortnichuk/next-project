import React, { useState, useMemo, Dispatch, FC } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Products from '@components/Products';
import {
  BASE_JSON_URL,
  PRICE_HIGH,
  PRICE_LOW,
  PRICE_SORTING,
  IProduct,
} from '@shared';
import styles from '@styles/catalog.module.scss';

const Catalog: NextPage<{ products: IProduct[]; brands: string[] }> = ({
  products,
  brands,
}) => {
  const [query, setQuery] = useState('');
  const [filterBrand, setBrand] = useState<string | undefined>();
  const [priceRate, setPriceRate] = useState<string>('all');

  const {
    filter,
    filter_group,
    options,
    search,
    search_input,
    selection,
    title,
  } = styles;

  const handleChange =
    (setState: Dispatch<string>) =>
    (event: React.ChangeEvent<EventTarget>): void => {
      let target = event.target as HTMLInputElement | HTMLSelectElement;
      setState(target.value);
    };

  const searchedProducts = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      ),
    [products, query]
  );

  const productsByBrand = useMemo(() => {
    switch (filterBrand) {
      case 'all':
      case undefined: //"null" and "undefined" value may come in response from request
      case null:
        return searchedProducts;
      default:
        return [...searchedProducts].filter(
          (product) => product.brand === filterBrand
        );
    }
  }, [searchedProducts, filterBrand]);

  const sortedByPrice = useMemo(() => {
    switch (priceRate) {
      case 'all':
        return productsByBrand;
      case 'low':
        return productsByBrand.sort((a, b) => +a.price - +b.price);
      case 'high':
        return productsByBrand.sort((a, b) => +b.price - +a.price);
    }
  }, [productsByBrand, priceRate]);

  const Filter: FC = () => (
    <div className={filter}>
      <div className={filter_group}>
        <p className={selection}>Sort by</p>
        <select className={options} onBlur={handleChange(setBrand)}>
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
        <select className={options} onBlur={handleChange(setPriceRate)}>
          <option value="all">{PRICE_SORTING}</option>
          <option value="high">{PRICE_HIGH}</option>
          <option value="low">{PRICE_LOW}</option>
        </select>
      </div>
      <div className={filter_group}>
        <div className={search}>
          <input
            className={search_input}
            type="search"
            value={query}
            placeholder="Search by name"
            onChange={handleChange(setQuery)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Filter />
      <h2 className={title} data-testid="all-products">
        All our products
      </h2>
      <Products products={sortedByPrice} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(BASE_JSON_URL);
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
