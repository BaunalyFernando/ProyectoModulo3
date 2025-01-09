import styles from "./NavBar.module.css";
import logoNavBar from "../../assets/logoNavBar.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { logOut, user } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    if (user) {
      logOut();
      Swal.fire({
        icon: "warning",
        title: "Your session has been closed successfully.",
      });
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <div className={styles.navBar}>
      <img src={logoNavBar} alt="logoNavBar" className={styles.logoNav} />
      <Link className={styles.link} to="/home">
        Home
      </Link>
      {isLoggedIn && (
        <>
          <Link className={styles.link} to="/myappointments">
            My Appointments
          </Link>
          <Link className={styles.link} to="/schedule">
            Schedule your appointment
          </Link>
        </>
      )}
      <button className={styles.logoutButton} onClick={handleLogout}>
        {isLoggedIn ? "Log Out" : "Login"}
      </button>
    </div>
  );
};

export default NavBar;
