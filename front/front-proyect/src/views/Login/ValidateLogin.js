const validateLogin = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = "El nombre de usuario es obligatorio";
    } else if (values.username.length < 3) {
        errors.username = "El nombre de usuario debe tener al menos 3 caracteres";
    }

    if (!values.password) {
        errors.password = "La contraseña es obligatoria";
    }

    return errors;
};

export default validateLogin;