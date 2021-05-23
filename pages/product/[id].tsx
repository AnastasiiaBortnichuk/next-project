import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import {
  ADDED,
  ADD_TO,
  BASE_URL,
  FILLED_HEART,
  EMPTY_HEART,
  handleClick,
  isAdded,
  IProductComponentProps,
} from '../../shared';
import styles from '../../styles/id.module.scss';

const ProductPage = ({
  product,
  cart,
  setCart,
  favorites,
  setFavorites,
}: IProductComponentProps): JSX.Element => {
  const {
    id,
    api_featured_image,
    brand,
    name,
    description,
    rating,
    price,
    price_sign,
    product_colors,
  } = product;

  const setClassName = isAdded(cart, id) ? styles.button_buy__active : styles.button_buy;

  const setButtonTitle = isAdded(cart, id) ? ADDED : ADD_TO;

  const setIcon = isAdded(favorites, id) ? FILLED_HEART : EMPTY_HEART;

  return (
    <>
      <p className={styles.name}>{name}</p>
      <div className={styles.container}>
        <div className={styles.container_box}>
          <Image
            src={`http:${api_featured_image}`}
            width={320}
            height={320}
            className={styles.image}
          />
          <p className={styles.text}>
            Price: {price}
            <span>{price_sign}</span>
          </p>
          <div className={styles.button}>
            <button
              type="submit"
              className={setClassName}
              onClick={handleClick(cart, setCart, product, id)}
            >
              {setButtonTitle}
            </button>
            <button
              type="submit"
              className={styles.button_like}
              onClick={handleClick(favorites, setFavorites, product, id)}
            >
              <img src={setIcon} alt="heart icon" />
            </button>
          </div>
        </div>
        <div className={styles.container_box}>
          <p className={styles.brand}>Brand: {brand}</p>
          <p className={styles.text}>{description}</p>
          <p className={styles.text}>Star rating:{rating ? rating : ' unrated'} </p>
        </div>
      </div>
      <ul className={styles.colors}>
        {product_colors.map(({ colour_name, hex_value }) => (
          <li className={styles.colors_box} key={colour_name}>
            {/*in-line style is using because hex value comes from API*/}
            <div className={styles.color} style={{ background: `${hex_value}` }} />
            <div className={styles.text}>{colour_name}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(BASE_URL);
  const products = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products/${params.id}.json`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
