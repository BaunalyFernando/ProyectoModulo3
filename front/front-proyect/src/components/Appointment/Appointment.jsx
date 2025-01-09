/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import styles from "./Appointment.module.css";
import Swal from "sweetalert2";

export const Appointment = ({ date, time, status, id, showId }) => {

    const { cancelUserAppointment } = useContext(UserContext);

    const handleCancel = async () => {
        try {
            await cancelUserAppointment(id);
            Swal.fire({
                icon: "success",
                title: "Appointment canceled successfully!",
            });
          } catch (error) {
            Swal.fire({
                icon: "error",
                title: `${error.response.data.message}`,
                text: "Try again",
            });
          }
    }


    return (
        <div className={styles.card}>
      <h3 className={styles.title}>Appointment: #{showId} </h3>
      <p>
        <strong>📅 Date:</strong> {date}
      </p>
      <p>
        <strong>⏰ Time: </strong> {time}
      </p>
      <p>
        <strong>📍 Status:</strong>{" "}
        <span>
          {status === "active" && "✅ Active"}
          {status === "cancelled" && "❌ Canceled"}
        </span>
      </p>
      <button
        className={styles.button}
        
        disabled={status === "cancelled"} 
        onClick={handleCancel}
      >
        {status === "cancelled" ? "Canceled" : "Cancel"}
      </button>
    </div>
    )

}