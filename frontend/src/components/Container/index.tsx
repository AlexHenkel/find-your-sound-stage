import { PropsWithChildren } from 'react';
import styles from './styles.module.css';

export default function Container({ children }: PropsWithChildren<unknown>) {
  return <div className={styles.container}>{children}</div>;
}
