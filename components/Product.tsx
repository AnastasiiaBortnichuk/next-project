import Image from 'next/image';
import Link from 'next/link';
import {
  ADDED,
  ADD_TO,
  FILLED_HEART,
  EMPTY_HEART,
  handleClick,
  isAdded,
  ProductComponentProps,
} from '../shared';
import styles from '../styles/products.module.scss';

const Product = ({
  product,
  cart,
  setCart,
  favorites,
  setFavorites,
}: ProductComponentProps): JSX.Element => {
  const { id, api_featured_image, brand, name, price, price_sign, product_colors } = product;

  const setClassName = isAdded(cart, id) ? styles.button_buy__active : styles.button_buy;

  const setButtonTitle = isAdded(cart, id) ? ADDED : ADD_TO;

  const setIcon = isAdded(favorites, id) ? FILLED_HEART : EMPTY_HEART;

  return (
    <div className={styles.product}>
      <Link href={`/product/${id}`}>
        <a className={styles.product_container}>
          <Image
            src={`http:${api_featured_image}`}
            width={210}
            height={210}
            className={styles.image}
          />
          <h3 className={styles.brand}>{brand}</h3>
          <p>{name}</p>
          <p>
            {price}
            <span>{price_sign}</span>
          </p>
          <ul className={styles.colors}>
            {product_colors.slice(0, 30).map((col, i) => (
              <li
                className={styles.color}
                style={{ background: `${col.hex_value}` }}
                key={`${col.hex_value}-${i}`}
              />
            ))}
          </ul>
        </a>
      </Link>
      <div className={styles.button}>
        <button
          type="submit"
          className={setClassName}
          onClick={() => handleClick(cart, setCart, product, id)}
        >
          {setButtonTitle}
        </button>
        <button
          type="submit"
          className={styles.button_like}
          onClick={() => handleClick(favorites, setFavorites, product, id)}
        >
          <img src={setIcon} alt="heart icon" />
        </button>
      </div>
    </div>
  );
};

export default Product;
