import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import Image from 'next/image';
import { FC } from 'react';
import {
  CART_ADDED,
  CART_ADD_TO,
  BASE_URL,
  FILLED_HEART,
  EMPTY_HEART,
  handleClick,
  isAdded,
  IProduct,
  useCartContext,
  useFavoritesContext,
} from '@shared';
import styles from '@styles/products.module.scss';

const ProductPage: NextPage<{ product: IProduct }> = ({ product }) => {
  const { cart, setCart } = useCartContext();
  const { favorites, setFavorites } = useFavoritesContext();

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

  const Buttons: FC = () => {
    const ClassName = isAdded(cart, id) ? button_buy__active : button_buy;
    const ButtonTitle = isAdded(cart, id) ? CART_ADDED : CART_ADD_TO;
    const Icon = isAdded(favorites, id) ? FILLED_HEART : EMPTY_HEART;

    return (
      <div className={button}>
        <button
          type="submit"
          className={ClassName}
          onClick={handleClick(cart, setCart, product, id)}
        >
          {ButtonTitle}
        </button>
        <button
          type="submit"
          className={button_like}
          onClick={handleClick(favorites, setFavorites, product, id)}
        >
          <img src={Icon} alt="heart icon" />
        </button>
      </div>
    );
  };

  const Colors: FC = () => (
    <ul className={colors_detailed}>
      {product_colors.map(({ colour_name, hex_value }) => (
        <li className={colors_box} key={colour_name}>
          <div
            className={color_rectangle}
            //in-line style is using because hex value comes from API
            style={{ background: `${hex_value}` }}
          />
          <div className={text}>{colour_name}</div>
        </li>
      ))}
    </ul>
  );

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
          <Buttons />
        </div>

        <div className={container_box}>
          <p className={brand_title}>Brand: {brand}</p>
          <p className={text}>{description}</p>
          <p className={text}>Star rating:{rating || ' unrated'} </p>
        </div>
      </div>

      <Colors />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(BASE_URL);
  const products = await res.json();

  const paths = products.map(({ id }) => ({
    params: { id: `${id}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${BASE_URL}/product/${params.id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
