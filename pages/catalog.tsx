import React, { useState, useMemo, Dispatch, FC } from 'react';
import { GetStaticProps, NextPage } from 'next';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import Products from '@components/Products';
import { BASE_JSON_URL, IProduct } from '@shared';
import styles from '@styles/catalog.module.scss';

const searchClient = algoliasearch(
  'XZYP9E6B2D',
  '351ddd988d60d1367b28bc6814901be8'
);

const Catalog: NextPage<{ products: IProduct[]; brands: string[] }> = ({
  products,
  brands,
}) => {
  const [query, setQuery] = useState('');
  const [filterBrand, setBrand] = useState<string | undefined>();

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
      <InstantSearch indexName="next_project" searchClient={searchClient}>
        <div className="search-panel">
          <div className="search-panel__filters">
            <RefinementList attribute="brand" />
          </div>

          <div className="search-panel__results">
            <SearchBox
              className="searchbox"
              translations={{
                placeholder: '',
              }}
            />
            <Hits hitComponent={Hit} />

            <div className="pagination">
              <Pagination />
            </div>
          </div>
        </div>
      </InstantSearch>
      <h2 className={title}>All our products</h2>
      <Products products={productsByBrand} />
    </>
  );
};

function Hit(props) {
  return (
    <article>
      <h1>
        <Highlight attribute="name" hit={props.hit} />
      </h1>
      <p>
        <Highlight attribute="description" hit={props.hit} />
      </p>
    </article>
  );
}

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
