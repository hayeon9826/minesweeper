import Link from "next/link";
import * as styles from "@/styles/common.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/">
          <span className={styles.logo}>Minesweeper</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/">
            <span className={styles.navLink}>Home</span>
          </Link>
          <Link href="/rank">
            <span className={styles.navLink}>Ranking</span>
          </Link>
          <Link href="/game">
            <span className={styles.navLink}>Game</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
