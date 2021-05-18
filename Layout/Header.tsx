import Image from 'next/image'
import Link from 'next/link'
import styles from './header.module.css';

const Header: React.FC = () => (
  <header className={styles.headerContainer}>
    <Link href="/">
      <a>
        <Image 
          src="/favicon.ico"
          width={50}
          height={50}
        />
      </a>
    </Link>
    <nav className={styles.nav}>
      <div className={styles.navList}>
        {['catalog', 'face', 'eyes', 'lips', 'brows', 'nails', 'cart', 'favorites'].map(item => (
          <Link href={`/${item}`} key={item}><a className={styles.link}>{item}</a></Link>
        ))}
      </div>
    </nav>
  </header>
)

export default Header;
