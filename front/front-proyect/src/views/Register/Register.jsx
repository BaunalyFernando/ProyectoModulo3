import { Formik, Form, Field, ErrorMessage } from "formik";
import validate from "./validateRegister";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Register = () => {

    const {registerUser} = useContext(UserContext);

    const initialValues = {
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
    };

    const handleSubmit = async (values, { resetForm }) => {
            registerUser(values)
            .then((response) => {
                if (response.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'User registered successfully!',
                    })

                    resetForm();
                }
            })
            .catch((err) =>{
              
                if(err.response.data.details.includes("email")){
                    Swal.fire({
                        icon: 'error',
                        title: `El email ya está registrado con el mail: ${values.email}`,
                        text: "Por favor, ingrese un email diferente.",
                    })
                } else if(err.response.data.details.includes("username")){
                    Swal.fire({
                        icon: 'error',
                        title: `Ya existe un usuario registrado con el username: ${values.username}`,
                        text: "Por favor, ingrese un nombre de usuario diferente.",
                    })
                    
                } else if (err.response.data.details.includes("nDni")){
                    Swal.fire({
                        icon: 'error',
                        title: `Ya existe un usuario registrado con el DNI: ${values.nDni}`,
                        text: "Por favor, ingrese un DNI diferente.",
                    })
                }
            })

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
                        <button 
                            type="submit" 
                            className={styles.button}
                            
                            >
                            Registrar
                        </button>
                        <br />
                        <label>
                           Ya tienes cuenta? <Link to="/" className={styles.link}>Login</Link>
                        </label>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Register;
