
import Signup from "./components/Signup"
import Login from "./components/Login"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
// import { Container, Row, Col} from "react-bootstrap"
import { UserAuthContextProvider } from "./context/UserAuthContext"
import Home from "./components/Home"
import ProtectedRoute from "./components/ProtectedRoute"
// import AdminList from "./components/Admin/AdminList"
import MainAdmin from "./components/Admin/MainAdmin"
import Sidebar from "./components/Sidebar"
import ApplicationList from "./components/pages/ApplicationList"
import PendingApplication from "./components/pages/PendingApplication"
import RecordList from "./components/pages/ApprovedList"
import BookingList from "./components/pages/BookingList"
import View from "./components/pages/View"
import DeclinedList from "./components/pages/DeclinedList"
import SignOut from "./components/pages/SignOut"
import ApprovedList from "./components/pages/ApprovedList"



function App() {
  return (

    <UserAuthContextProvider>

      <Routes>
      <Route exact path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<MainAdmin />} />  
      </Routes>   
      {/* <Sidebar> */}
      <Routes>
        
        <Route path="/dashboard" element={<ApplicationList/>} />
        <Route path="/application" element={<ApplicationList />} />
        <Route path="/pending" element={<PendingApplication />} />
        <Route path="/record" element={<ApprovedList/>} />
        <Route path="/booking" element={<BookingList />} />
        <Route path="/view" element={<View />} />
        <Route path="/declined" element={<DeclinedList/>} />
        {/* <Route path="/signout" element={<SignOut />} /> */}
        {/* <Route path="/productList" element={<ProductList />} /> */}
       
      </Routes>
      {/* </Sidebar> */}
     
     
    
    </UserAuthContextProvider>
  )
}

export default App