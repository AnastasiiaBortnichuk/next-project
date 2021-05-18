import React, { useState, useMemo, SetStateAction, Dispatch } from 'react'
import Products from '../components/Products'
import { GetStaticProps } from 'next'
import styles from './filters.module.scss'
import { IProduct } from '../types/types'


const Catalog = ({ products, brands, cart, setCart, favorites, setFavorites }:{
  products: Array<IProduct>,
  brands: Array<string>,
  cart: Array<IProduct>,
  setCart: Dispatch<SetStateAction<IProduct[]>>,
  favorites: Array<IProduct>,
  setFavorites: Dispatch<SetStateAction<IProduct[]>>
}) => {

  const [query, setQuery] = useState('');
  const [filterBrand, setBrand] = useState();
  
  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleChoose = (event) => {
    setBrand(event.target.value);
  };

  const searchedProducts = useMemo(
    () =>
    products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      ),
    [products, query]
  );

  const productsByBrand = useMemo(
    () => {
      switch (filterBrand) {
        case ("all"):
        case (undefined):
        case (null):
          return searchedProducts;
        default:
          return [...searchedProducts].filter(product =>product.brand === filterBrand)
      }
    }, [searchedProducts, filterBrand ]
  );

  return (
    <>
      <div className={styles.filter}>
        <div className={styles.filter_group}>
          <p className={styles.selection}>Sort by</p>
          <select className={styles.options} onChange={handleChoose}>
            <option value="all">choose brand</option>
          {brands.map(brand => 
            (brand && <option value={brand} id={brand}>{brand}</option>)
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
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const res = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json")
  const products = await res.json();

  const brands = Array.from(new Set(products.map(product => (product.brand)).sort()));
 
  return {
    props: {
      products,
      brands
    },
  }
}

export default Catalog;
