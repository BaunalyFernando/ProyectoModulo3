import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { user, getUserData, userData } = useContext(UserContext);

  useEffect(() => {
    getUserData(user);
    console.log(userData);
  }, [user]);

  return (
    <div className={styles.container}>
      <h1>¡Welcome to Smile ortodoncia!</h1>
      <p>In this application you can check your appointments and also register appointments with us.</p>
      {user ? (
        <Link className={styles.link} to="/myappointments">Go to my appointments</Link>
      ) : (
        <p>
          Inicia sesión <Link className={styles.link} to="/login">aquí</Link>
        </p>
      )}
    </div>
  );
};

export default Home;
