/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext({
    user:'',
    userAppointments: [],
    userData: {},
    registerUser: async() => {},
    loginUser: async() => {}, 
    scheduleAppointment: async() => {},  
    getUserAppointment: async() => {},
    logOut: () => {},
    cancelUserAppointment: async() => {},
    getUserData: async() => {}
})

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(localStorage.getItem("user") ?? false);
    const [userAppointments, setUserAppointments] = useState([]);
    const [userData, setUserData] = useState({});

    const registerUser = async(userData) => {
        return await axios.post("http://localhost:3001/users/register", userData)
    }

    const loginUser = async(loginData) => {
        const res = await axios.post("http://localhost:3001/users/login", loginData)
        localStorage.setItem("user", res.data.data.user.id)
        setUser(res.data.data.user.id)
        return res;
    }

    const logOut = () => {
        localStorage.removeItem("user");
        setUser(false);
        setUserAppointments([]);
    }

    const scheduleAppointment = async(appointmentData) => {
        return await axios.post("http://localhost:3001/appointments/schedule", appointmentData)
    }

    const getUserAppointment = async(userId) => {
       const { data } =  await axios.get(`http://localhost:3001/users/${userId}`);
         setUserAppointments(data.appointments)
    }

    const getUserData = async(userId) => {
        const { data } =  await axios.get(`http://localhost:3001/users/${userId}`);
        setUserData(data)
     }

    const cancelUserAppointment = async(appointmentId) => {
        await axios.put(`http://localhost:3001/appointments/cancel/${appointmentId}`);
        const newAppointment = userAppointments.map((appointment) =>  appointment.id === appointmentId 
            ? { ...appointment, status: "cancelled" } : appointment );
        setUserAppointments(newAppointment);
    }


    const values = {
        user,
        registerUser,
        loginUser,
        scheduleAppointment,
        getUserAppointment,
        userAppointments,
        logOut,
        cancelUserAppointment,
        getUserData,
        userData
    }

    return (
        <UserContext.Provider value={ values }>
            {children}
        </UserContext.Provider>
    )
}
