import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext } from "react";
import styles from "./Schedule.module.css";
import validateSchedule from "./validateSchedule";
import Swal from "sweetalert2"; 
import { UserContext } from "../../context/UserContext";


const Schedule = () => {
  const { user, scheduleAppointment } = useContext(UserContext);


  const handleOnSubmit = async (values, { setSubmitting }) => {
   
    if(!user){
      Swal.fire({
        icon: 'error',
        title: 'You must be logged in to schedule an appointment',
      })
    }

    const valueData = {
      ...values,
      userId: user,
    }
    await scheduleAppointment(valueData)
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Appointment scheduled successfully!",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: `${err.response.data.message}`,
          text: "Try again",
        });
      });
    setSubmitting(false);
  };

  const initialValues = {
    date: "",
    time: "",
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Schedule your appointment</h2>
      <Formik
        initialValues={initialValues}
        validate={validateSchedule}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.group}>
              <label className={styles.label}>Date:</label>
              <Field
                type="date"
                name="date"
                className={styles.input}
              />

              <ErrorMessage name="date" component="div" className={styles.error} />
            </div>
            <div className={styles.group}>
              <label className={styles.label}>Time:</label>
              <Field
                type="time"
                name="time"
                className={styles.input}
              />
              <ErrorMessage name="time" component="div" className={styles.error} />
            </div>
            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Schedule;
