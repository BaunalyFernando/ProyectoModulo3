/* eslint-disable react/no-unescaped-entities */
import { Formik, Form, Field, ErrorMessage } from "formik";
import validateLogin from "./validateLogin";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const Login = () => {
    const {loginUser} = useContext(UserContext);
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };
    

    const handleSubmit = async (values) => {
         loginUser(values)   
         .then((response) => {                
                if(response.status === 200){
                    Swal.fire({
                        icon: "success",
                        title: "Usuario logueado correctamente.",
                      });
          
                navigate("/home");
                
            }})
            .catch((err) => {
                if (err.response.data.code === 400) {
                    Swal.fire({
                      icon: "error",
                      title: `${err.response.data.details}`,
                      text: "Intentelo nuevamente.",
                    });
                  } else if (err.response.data.message) {
                    Swal.fire({
                      icon: "error",
                      title: `${err.response.data.message}`,
                      text: "Intentelo nuevamente.",
                    });
                  }
        
            });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Iniciar Sesión</h1>
            <div className={styles.card}>
                <Formik
                    initialValues={initialValues}
                    validate={validateLogin}
                    onSubmit={handleSubmit}
                >
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="username">Username</label>
                            <Field
                                name="username"
                                type="text"
                                className={styles.input}
                            />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <Field
                                name="password"
                                type="password"
                                className={styles.input}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className={styles.error}
                            />
                        </div>
                        <button type="submit" className={styles.button}>
                            Log In
                        </button>
                        <br />
                        <label>
                           Don't have an account yet? <Link to="/register" className={styles.link}>Register here</Link>
                        </label>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
