import { BrowserRouter } from "react-router-dom"
import MyAppointments from "./views/MyAppointments/MyAppointments"
import NavBar from "./components/NavBar"
import Register from "./views/Register/Register"
import Login from "./views/Login/Login"

function App() {
 

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <MyAppointments />
        <Register />
        <Login />
      </BrowserRouter>
      
    </>
  )
}

export default App
