import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/header.module.scss';

const HEADER_LINKS = ['catalog', 'face', 'eyes', 'lips', 'brows', 'nails', 'cart', 'favorites'];

const Header: React.FC = () => (
  <header className={styles.headerContainer}>
    <Link href="/">
      <a>
        <Image src="/favicon.ico" width={50} height={50} />
      </a>
    </Link>
    <nav className={styles.nav}>
      <div className={styles.navList}>
        {HEADER_LINKS.map((link) => (
          <Link href={`/${link}`} key={link}>
            <a className={styles.link}>{link}</a>
          </Link>
        ))}
      </div>
    </nav>
  </header>
);

export default Header;
