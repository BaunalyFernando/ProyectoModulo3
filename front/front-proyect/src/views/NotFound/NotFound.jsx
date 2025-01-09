import { Link } from "react-router-dom";
import styles from "./NotFound.module.css"; // Importar el módulo CSS

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link to="/home" className={styles.link}>
        Go back to the main page
      </Link>
    </div>
  );
};

export default NotFound;
