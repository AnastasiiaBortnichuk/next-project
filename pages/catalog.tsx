import { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import Products from '../components/Products';
import { IProduct, ComponentProps } from '../types/types';
import { BASE_URL } from '../types/constants';
import styles from '../styles/filters.module.scss';

interface CatalogProps extends ComponentProps {
  products: Array<IProduct>;
  brands: Array<string>;
}

const Catalog = ({
  products,
  brands,
  cart,
  setCart,
  favorites,
  setFavorites,
}: CatalogProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const [filterBrand, setBrand] = useState();

  const handleSearch = (event): void => {
    setQuery(event.target.value);
  };

  const handleChoose = (event): void => {
    setBrand(event.target.value);
  };

  const searchedProducts = useMemo(
    () => products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );

  const productsByBrand = useMemo(() => {
    switch (filterBrand) {
      case 'all':
      case undefined:
      case null: //"null" value may come in response from request
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
          <select className={styles.options} onBlur={handleChoose}>
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
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <h2 className={styles.title}>All our products</h2>
      <Products
        products={productsByBrand}
        favorites={favorites}
        setFavorites={setFavorites}
        cart={cart}
        setCart={setCart}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(BASE_URL);
  const products = await res.json();

  const brands = Array.from(new Set(products.map((product) => product.brand).sort()));

  return {
    props: {
      products,
      brands,
    },
  };
};

export default Catalog;
