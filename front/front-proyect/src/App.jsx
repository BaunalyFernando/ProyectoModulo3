
import MyAppointments from "./views/MyAppointments/MyAppointments"
import NavBar from "./components/NavBar/NavBar"
import Register from "./views/Register/Register"
import Login from "./views/Login/Login"
import { Routes, Route , useLocation, useNavigate} from "react-router-dom"
import AboutUs from "./views/AboutUs/AboutUs"
import { useContext, useEffect, useState } from "react"
import NotFound from "./views/NotFound/NotFound"
import { UserContext } from "./context/UserContext"
import Home from "./views/Home/Home"
import Schedule from "./views/ScheduleAppointment/Schedule"


function App() {

   const { user} = useContext(UserContext);
   const [isNotFound, setIsNotFound] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
    
      if(!user && location.pathname !== "/" && location.pathname !== "/register" && location.pathname !== "/home"){
        navigate("/");
      }

      if(user && (location.pathname === "/" || location.pathname === "/register")){
        navigate("/home");
      }

      const validateRoutes = ["/", "/register", "/myappointments", "/aboutUs", "/home", "/schedule"];

      if(!validateRoutes.includes(location.pathname)){
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
  }), [navigate, user, location.pathname];
 

  return (
      <>
        {
          !user && location.pathname !== "/home" ?   (
            <Routes>    
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
            </Routes>
            
          ) 
          : (
            <>
              {
                !isNotFound && (
                  <>
                    <NavBar />                 
                  </>
                )
              }
             <>
              <Routes>
                <Route path="/myappointments" element={<MyAppointments />} />
                <Route path="/home" element={<Home />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
             </>
            </>
          )
        }
      </>      
  )
}

export default App
