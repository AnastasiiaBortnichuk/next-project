import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ERROR_TITLE, ERROR_CANT_FIND, ERROR_TRY, MENU_ITEMS } from '@shared';
import styles from '@styles/404.module.scss';

const Custom404: NextPage = () => {
  const { container, link, text } = styles;

  return (
    <div className={container}>
      <div>
        <Link href="/">
          <a>
            <Image src="/favicon.ico" width={100} height={100} />
          </a>
        </Link>
        <h1>{ERROR_TITLE}</h1>
        <p className={text}>{ERROR_CANT_FIND}</p>
        <p className={text}>{ERROR_TRY}</p>
        <ul>
          {MENU_ITEMS.map((item) => (
            <li key={item}>
              <Link href={`/${item}`}>
                <a className={link}>{item}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Image src="/assets/images/broken.png" width={860} height={540} />
    </div>
  );
};

export default Custom404;
