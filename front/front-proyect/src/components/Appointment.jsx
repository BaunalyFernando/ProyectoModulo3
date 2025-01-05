/* eslint-disable react/prop-types */
import styles from "../styles/Appointment.module.css";

export const Appointment = ({ date, time, status }) => {
    return (
        <div className={styles.card}>
      <h3 className={styles.title}>Turno </h3>
      <p>
        <strong>📅 Fecha:</strong> {date}
      </p>
      <p>
        <strong>⏰ Hora: </strong> {time}
      </p>
      <p>
        <strong>📍 Estado:</strong>{" "}
        <span>
          {status === "active" && "✅ Activo"}
          {status === "cancelled" && "❌ Cancelado"}
        </span>
      </p>
      <button
        className={styles.button}
        
        disabled={status === "cancelled"} 
      >
        {status === "cancelled" ? "Cancelado" : "Cancelar"}
      </button>
    </div>
    )

}