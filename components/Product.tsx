import Image from 'next/image';
import Link from 'next/link';
import {
  ADDED,
  ADD_TO,
  FILLED_HEART,
  EMPTY_HEART,
  handleClick,
  isAdded,
  IProductComponentProps,
} from '../shared';
import styles from '../styles/products.module.scss';

const Product = ({
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
    price,
    price_sign,
    product_colors,
  } = product;

  const {
    brand_name,
    button,
    button_buy,
    button_buy__active,
    button_like,
    colors,
    color_circle,
    image,
    products,
    products__container,
  } = styles;

  const setClassName = isAdded(cart, id) ? button_buy__active : button_buy;

  const setButtonTitle = isAdded(cart, id) ? ADDED : ADD_TO;

  const setIcon = isAdded(favorites, id) ? FILLED_HEART : EMPTY_HEART;

  return (
    <div className={products}>
      <Link href={`/product/${id}`}>
        <a className={products__container}>
          <Image
            src={`http:${api_featured_image}`}
            width={210}
            height={210}
            className={image}
          />
          <p className={brand_name}>{brand}</p>
          <p>{name}</p>
          <p>
            {price}
            <span>{price_sign}</span>
          </p>
          <ul className={colors}>
            {product_colors.slice(0, 30).map((color, i) => (
              <li
                className={color_circle}
                //in-line style is using because hex value comes from API
                style={{ background: `${color.hex_value}` }}
                key={`${color.hex_value}-${i}`}
              />
            ))}
          </ul>
        </a>
      </Link>
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
  );
};

export default Product;
