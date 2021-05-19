import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { ProductComponentProps } from '../../types/types';
import { BASE_URL } from '../../types/constants';
import styles from '../../styles/id.module.scss';

const ProductPage = ({
  product,
  cart,
  setCart,
  favorites,
  setFavorites,
}: ProductComponentProps): JSX.Element => {
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

  const handleClick = (prop, setProp) => {
    if (favorites.length === 0) {
      setProp([product]);
    } else {
      setProp(
        prop.some((item) => item.id === id)
          ? [...prop.filter((item) => item.id !== id)]
          : [...prop, product]
      );
    }
  };

  const getClassName = cart.some((purchase) => purchase.id === id)
    ? styles.button_buy__active
    : styles.button_buy;

  const getButtonTitle = cart.some((purchase) => purchase.id === id)
    ? 'Added to cart'
    : 'Add to cart';

  const getIcon = favorites.some((item) => item.id === id)
    ? '/filledHeartLike.svg'
    : '/heartLike.svg';

  return (
    <>
      <h2 className={styles.name}>{name}</h2>
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
              className={getClassName}
              onClick={() => handleClick(cart, setCart)}
            >
              {getButtonTitle}
            </button>
            <button
              type="submit"
              className={styles.button_like}
              onClick={() => handleClick(favorites, setFavorites)}
            >
              <img src={getIcon} alt="heart icon" />
            </button>
          </div>
        </div>
        <div className={styles.container_box}>
          <h3 className={styles.brand}>Brand: {brand}</h3>
          <p className={styles.text}>{description}</p>
          <p className={styles.text}>Star rating:{rating ? rating : ' unrated'} </p>
        </div>
      </div>
      <div className={styles.colors}>
        {product_colors.map((col) => (
          <div className={styles.colors_box} key={col.colour_name}>
            <div className={styles.color} style={{ background: `${col.hex_value}` }}></div>
            <div className={styles.text}>{col.colour_name}</div>
          </div>
        ))}
      </div>
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
