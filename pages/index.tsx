import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { BASE_JSON_URL, updateTitle } from '../shared';
import styles from '../styles/home.module.scss';

const CATEGORIES = ['face', 'brows', 'lips', 'nails', 'eyes'];

const Home: NextPage<{ types: string[] }> = ({ types }) => {
  const { grid, link, main, title } = styles;

  return (
    <>
      <main className={main}>
        <Head>
          <title>MakeUp</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
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
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(BASE_JSON_URL);
  const products = await res.json();

  const types = Array.from(
    new Set(products.map((product) => product.product_type))
  );

  return {
    props: {
      types,
    },
  };
};

export default Home;
