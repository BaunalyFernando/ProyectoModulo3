const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "El nombre es obligatorio";
    } else if (values.name.length < 3) {
        errors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!values.email) {
        errors.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "El correo no es válido";
    }

    if (!values.birthdate) {
        errors.birthdate = "La fecha de nacimiento es obligatoria";
    }

    if (!values.nDni) {
        errors.nDni = "El DNI es obligatorio";
    } else if (!/^\d+$/.test(values.nDni)) {
        errors.nDni = "El DNI debe contener solo números";
    }

    if (!values.username) {
        errors.username = "El nombre de usuario es obligatorio";
    } else if (values.username.length < 3) {
        errors.username = "El nombre de usuario debe tener al menos 3 caracteres";
    }

    if (!values.password) {
        errors.password = "La contraseña es obligatoria";
    } else if (values.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    return errors;
};

export default validate;