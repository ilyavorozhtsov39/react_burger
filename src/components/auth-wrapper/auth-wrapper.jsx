import styles from "./auth-wrapper.module.scss";
import PropTypes from "prop-types";

function AuthWrapper({ title, children }) {
  return (
    <main className={styles.authWrapper}>
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            {children}
        </div>
    </main>
  );
}

AuthWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default AuthWrapper;