import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import validate from "./validate";
import styles from "../../styles/Register.module.css";

const Register = () => {
    const initialValues = {
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
    };

    const handleSubmit = async (values, { resetForm }) => {
        axios.post("http://localhost:3001/users/register", values)
            .then((response) => {
                if (response.status === 201) {
                    alert("Usuario registrado exitosamente");
                    resetForm();
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert(error.response.data.details);
                }
            });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Registro de Usuario</h1>
            <div className={styles.card}>
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Nombre</label>
                            <Field name="name" type="text" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Correo</label>
                            <Field name="email" type="email" className={styles.input} />
                            <ErrorMessage name="email" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="birthdate">Fecha de Nacimiento</label>
                            <Field name="birthdate" type="date" className={styles.input} />
                            <ErrorMessage name="birthdate" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="nDni">DNI</label>
                            <Field name="nDni" type="text" className={styles.input} />
                            <ErrorMessage name="nDni" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="username">Usuario</label>
                            <Field name="username" type="text" className={styles.input} />
                            <ErrorMessage name="username" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Contraseña</label>
                            <Field name="password" type="password" className={styles.input} />
                            <ErrorMessage name="password" component="div" className={styles.error} />
                        </div>
                        <button type="submit" className={styles.button}>
                            Registrar
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;
