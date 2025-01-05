import { useEffect, useState } from "react";
import { Appointment } from "../../components/Appointment";
import styles from "../../styles/MyAppointments.module.css";
import axios from "axios";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

   useEffect(() => {

     axios.get("http://localhost:3001/appointments")
      .then((response) => {
          setAppointments(response.data.data);
      })
      .catch((error) => {
          console.log(error);
      });
        
   }, []);

    return (
        <>
            <div className={styles.container}>
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                 <Appointment
                    key={appointment.id}
                    id={appointment.id}
                    date={appointment.date}
                    time={appointment.time}
                    status={appointment.status}
                 />
                ))
                ):(
                    <div className={styles.containerNoAppointmet}>
                    <h1>You don’t have any appointments scheduled yet.</h1> <br /><h3></h3>
                    </div>
                )}
            </div>     
        </>
    )
}

export default MyAppointments
