import Products from '../components/Products';
import { IComponentProps, IProduct } from '../shared';

const FAVORITES_TITLE = 'You liked these products';
const NO_FAVORITES_TITLE = 'Nothing was added to favorites';

const Favorites = (props: IComponentProps): JSX.Element => {
  const Title = (favorites: IProduct[]): string =>
    favorites.length ? FAVORITES_TITLE : NO_FAVORITES_TITLE;

  return (
    <>
      <section>
        <h1>{Title(props.favorites)}</h1>
        <Products products={props.favorites} {...props} />
      </section>
      {/* Added to demonstrate the built-in Next.js functionality of style jsx' */}
      <style jsx>{`
        section {
          margin: 0 30px;
        }
        h1 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Favorites;
