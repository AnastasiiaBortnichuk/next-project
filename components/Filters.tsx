import React, { useState, useMemo } from 'react'
import Products from '../components/Products'

export default function Filters(products, brands) {
  const [query, setQuery] = useState('');
  const [filterBrand, setBrand] = useState();

  console.log("filterBrand", filterBrand);
  
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
      <h2>All our products</h2>
      <Products products={productsByBrand} />
    </>
  )
}