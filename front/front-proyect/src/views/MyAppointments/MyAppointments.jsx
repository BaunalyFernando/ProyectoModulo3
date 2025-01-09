import { useContext, useEffect } from "react";
import { Appointment } from "../../components/Appointment/Appointment";
import styles from "./MyAppointments.module.css";
import { UserContext } from "../../context/UserContext";

const MyAppointments = () => {
    const { getUserAppointment, userAppointments, user } = useContext(UserContext);

   useEffect(() => {
    getUserAppointment(user);   
   }, [user]);

    return (
        <>
            <div className={styles.container}>
            {userAppointments.length > 0 ? (
                userAppointments.map((appointment, indice) => (
                 <Appointment
                    key={appointment.id}
                    id={appointment.id}
                    showId={indice + 1}
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
