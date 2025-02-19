import styles from "./auth-wrapper.module.scss";
import { FC, ReactNode } from 'react';

type TAuthWrapperProps = {
  title: string;
  children: ReactNode
}

const AuthWrapper: FC<TAuthWrapperProps> = ({ title, children }) => {
  return (
    <main className={styles.authWrapper}>
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            {children}
        </div>
    </main>
  );
}

export default AuthWrapper;