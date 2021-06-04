import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BASE_JSON_URL, CATEGORIES, IProduct, updateTitle } from '@shared';
import styles from '@styles/home.module.scss';

const Home: NextPage<{ types: string[] }> = ({ types }) => {
  const { grid, link, main, title } = styles;

  return (
    <main className={main}>
      <h1 className={title}>Makeup</h1>
      <div className={grid}>
        {CATEGORIES.map((category) => (
          <Link href={`/${category}`} key={category}>
            <a className={styles[category]}>
              <Image
                src={`/assets/images/${category}.png`}
                width={370}
                height={category === 'lips' ? 510 : 248}
                alt={category}
                title={category}
              />
            </a>
          </Link>
        ))}
      </div>
      <div>
        {types.map((type) => (
          <Link href={`/category/${type}`} key={type}>
            <a className={link}>{updateTitle(type)}</a>
          </Link>
        ))}
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(BASE_JSON_URL);
  const products = await res.json();

  const types = Array.from(
    new Set(products.map((product: IProduct) => product.product_type))
  );

  return {
    props: {
      types,
    },
  };
};

export default Home;
