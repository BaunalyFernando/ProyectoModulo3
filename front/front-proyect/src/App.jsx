import { BrowserRouter } from "react-router-dom"
import Home from "./views/Home"
import MyAppointments from "./views/MyAppointments"

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Home />
        <MyAppointments />
      </BrowserRouter>
      
    </>
  )
}

export default App
