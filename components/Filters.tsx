import React, { useState, useMemo, Dispatch, FC, useEffect } from 'react';
import {
  PRICE_HIGH,
  PRICE_LOW,
  PRICE_SORTING,
  SORTING_ORDER,
  IProduct,
} from '@shared';
import styles from '@styles/catalog.module.scss';

const Filters: FC<{
  products: IProduct[];
  brands: string[];
  setFilteredProducts: Dispatch<IProduct[]>;
}> = ({ products, brands, setFilteredProducts }) => {
  const [query, setQuery] = useState<string>('');
  const [filterBrand, setBrand] = useState<string | undefined>();
  const [priceRate, setPriceRate] = useState<string>('all');

  const { filter, filter_group, options, search, search_input, selection } =
    styles;

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
      case SORTING_ORDER.all:
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
      case SORTING_ORDER.all:
        return productsByBrand;
      case SORTING_ORDER.asc:
        return productsByBrand.sort((a, b) => +a.price - +b.price);
      case SORTING_ORDER.desc:
        return productsByBrand.sort((a, b) => +b.price - +a.price);
    }
  }, [productsByBrand, priceRate]);

  useEffect(() => {
    setFilteredProducts(sortedByPrice);
    return () => {
      setFilteredProducts(products);
    };
  }, [products, sortedByPrice, setFilteredProducts]);

  return (
    <div className={filter}>
      <div className={filter_group}>
        <p className={selection}>Sort by</p>
        <select className={options} onBlur={handleChange(setBrand)}>
          <option value={SORTING_ORDER.all}>choose brand</option>
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
          <option value={SORTING_ORDER.all}>{PRICE_SORTING}</option>
          <option value={SORTING_ORDER.desc}>{PRICE_HIGH}</option>
          <option value={SORTING_ORDER.asc}>{PRICE_LOW}</option>
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
};

export default Filters;
