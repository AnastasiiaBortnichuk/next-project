import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from '../styles/header.module.scss';

const Header: FC<{ items: string[] }> = ({ items }) => {
  const { headerContainer, link, nav } = styles;

  return (
    <header className={headerContainer}>
      <Link href="/">
        <a>
          <Image src="/favicon.ico" width={50} height={50} />
        </a>
      </Link>
      <nav className={nav}>
        {items.map((item) => (
          <Link href={`/${item}`} key={item}>
            <a className={link}>{item}</a>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
