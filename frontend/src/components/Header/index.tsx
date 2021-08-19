import { H1 } from '@blueprintjs/core';
import styles from './styles.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <H1 className={styles.title}>Find your sound stage</H1>
    </div>
  );
}
