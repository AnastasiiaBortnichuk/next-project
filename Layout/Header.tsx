import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/header.module.scss';

const MENU_ITEMS = ['catalog', 'face', 'eyes', 'lips', 'brows', 'nails', 'cart', 'favorites'];

const Header = (): JSX.Element => (
  <header className={styles.headerContainer}>
    <Link href="/">
      <a>
        <Image src="/favicon.ico" width={50} height={50} />
      </a>
    </Link>
    <nav className={styles.nav}>
      {MENU_ITEMS.map((item) => (
        <Link href={`/${item}`} key={item}>
          <a className={styles.link}>{item}</a>
        </Link>
      ))}
    </nav>
  </header>
);

export default Header;
