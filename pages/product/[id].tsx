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
import styles from '../../styles/products.module.scss';

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

  const {
    brand_title,
    button,
    button_buy,
    button_buy__active,
    button_like,
    color_rectangle,
    colors_box,
    colors_detailed,
    container,
    container_box,
    image,
    product_name,
    text,
  } = styles;

  const setClassName = isAdded(cart, id) ? button_buy__active : button_buy;

  const setButtonTitle = isAdded(cart, id) ? ADDED : ADD_TO;

  const setIcon = isAdded(favorites, id) ? FILLED_HEART : EMPTY_HEART;

  return (
    <>
      <p className={product_name}>{name}</p>
      <div className={container}>
        <div className={container_box}>
          <Image
            src={`http:${api_featured_image}`}
            width={320}
            height={320}
            className={image}
          />
          <p className={text}>
            Price: {price}
            <span>{price_sign}</span>
          </p>
          <div className={button}>
            <button
              type="submit"
              className={setClassName}
              onClick={handleClick(cart, setCart, product, id)}
            >
              {setButtonTitle}
            </button>
            <button
              type="submit"
              className={button_like}
              onClick={handleClick(favorites, setFavorites, product, id)}
            >
              <img src={setIcon} alt="heart icon" />
            </button>
          </div>
        </div>
        <div className={container_box}>
          <p className={brand_title}>Brand: {brand}</p>
          <p className={text}>{description}</p>
          <p className={text}>Star rating:{rating ? rating : ' unrated'} </p>
        </div>
      </div>
      <ul className={colors_detailed}>
        {product_colors.map(({ colour_name, hex_value }) => (
          <li className={colors_box} key={colour_name}>
            {/*in-line style is using because hex value comes from API*/}
            <div
              className={color_rectangle}
              style={{ background: `${hex_value}` }}
            />
            <div className={text}>{colour_name}</div>
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
  const res = await fetch(
    `http://makeup-api.herokuapp.com/api/v1/products/${params.id}.json`
  );
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
