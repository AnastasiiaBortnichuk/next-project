import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  SearchBox,
  Hits,
  ClearRefinements,
  Configure,
  RefinementList,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import styles from '@styles/search.module.scss';
import productStyles from '@styles/products.module.scss';

const client = algoliasearch('XZYP9E6B2D', '351ddd988d60d1367b28bc6814901be8');

const Hit = ({ hit }) => {
  console.log(hit);

  const {
    brand_name,
    image,
    products,
    brand_title,
    product_result,
    product_result_left,
    product_result_right,
  } = productStyles;

  return (
    <div className={products}>
      <Link href={`/product/${hit.id}`}>
        <a>
          <div className={product_result}>
            <div className={product_result_left}>
              <Image
                src={`http:${hit.api_featured_image}`}
                alt={hit.name}
                width={210}
                height={210}
                className={image}
              />
              <div className={brand_name}>
                <Highlight attribute="name" hit={hit} />
              </div>
              <div className={brand_title}>
                <Highlight attribute="brand" hit={hit} className={brand_name} />
              </div>
              <div className={brand_name}>
                <Highlight attribute="product_type" hit={hit} />
              </div>
              <div className={brand_title}>${hit.price}</div>
            </div>
            <div className={product_result_right}>
              <Highlight attribute="description" hit={hit} />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

const Search: NextPage = () => {
  const {
    container,
    searchbox,
    search_panel,
    search_panel__filters,
    search_panel__results,
    pagination,
    button,
  } = styles;

  return (
    <div className={container}>
      <InstantSearch indexName="next_project" searchClient={client}>
        <div className={search_panel}>
          <div className={search_panel__filters}>
            <ClearRefinements className={button} />
            <h2>Categories</h2>
            <RefinementList attribute="category" limit={50} />
            <Configure hitsPerPage={10} />

            <h2>Brands</h2>
            <RefinementList attribute="brand" limit={50} />
            <Configure hitsPerPage={10} />
          </div>

          <div className={search_panel__results}>
            <SearchBox
              className={searchbox}
              translations={{
                placeholder: '',
              }}
            />
            <Hits hitComponent={Hit} />

            <Pagination className={pagination} />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default Search;
