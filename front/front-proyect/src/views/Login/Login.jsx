import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import validateLogin from "./validateLogin";
import styles from "../../styles/Login.module.css";

const Login = () => {
    const initialValues = {
        username: "",
        password: "",
    };

    const handleSubmit = async (values, { resetForm }) => {
     
         axios.post("http://localhost:3001/users/login", values)
         .then((response) => {
            localStorage.setItem("user_id", response.data.data.user.id);
                if(response.status === 200){
                alert(response.data.message);
                
                resetForm();
                
                
            }})
            .catch((error) => {
                alert(error.response.data.message);
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
                            <label htmlFor="username">Nombre de Usuario</label>
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
                            <label htmlFor="password">Contraseña</label>
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
                            Iniciar Sesión
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
