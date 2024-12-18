import styles from "../Styles/NavBar.module.css";
import logoNavBar from "../assets/logoNavBar.png";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <div className={styles.navBar}>
      <img src={logoNavBar} alt="logoNavBar" className={styles.logoNav} />
        <Link className={styles.link} to="/home">Inicio</Link>
        <Link className={styles.link} to="/misTurnos">Mis turnos</Link>
        <Link className={styles.link} to="/aboutUs">¿Quiénes somos?</Link>
        <Link className={styles.link} to="/schedule">Agendá tu turno</Link>
        <button className={styles.logoutButton}>
        Cerrá sesión
      </button>
    </div>
  );
};

export default NavBar;