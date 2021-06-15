import Products from '@components/Products';
import {
  FAVORITES_TITLE,
  NO_FAVORITES_TITLE,
  useFavoritesContext,
} from '@shared';
import { NextPage } from 'next';

const Favorites: NextPage = () => {
  const { favorites } = useFavoritesContext();

  const Title = (): string =>
    favorites.length ? FAVORITES_TITLE : NO_FAVORITES_TITLE;

  return (
    <>
      <section>
        <h1>{Title()}</h1>
        <Products products={favorites} />
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
