const validateSchedule = (input) => {
    const error = {};


    if (!input.date) {
        error.date = "La fecha es requerida";
    } else {
        const selectedDate = new Date(`${input.date}T${input.time}`);
        const dayOfWeek = selectedDate.getUTCDay();
        const now = new Date();
        const twentyFourHours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const today = new Date();
        today.setHours(0, 0, 0, 0);


        if (dayOfWeek === 0 || dayOfWeek === 6) {
            error.date = "No se pueden agendar turnos los sábados ni domingos.";
        }

        if (selectedDate < twentyFourHours) {
            error.date = "No se pueden agendar turnos con menos de 24 horas de anticipación.";
        }


        if (selectedDate < today) {
            error.date = "No se pueden seleccionar fechas anteriores a la actual.";
        }
    }


    if (!input.time) {
        error.time = "La hora es requerida";
    } else {

        const [hours, minutes] = input.time.split(":").map(Number);
        if (hours < 9 || hours > 18 || (hours === 18 && minutes > 0)) {
            error.time = "La hora debe estar entre las 9:00 y las 18:00.";
        }
    }

    return error;
};

export default validateSchedule;