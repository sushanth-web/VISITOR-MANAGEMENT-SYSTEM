import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from './pages/Dashboard'
import Visitors from './pages/Visitors'
import Employees from './pages/Employees'
import CheckInOut from './pages/CheckInOut'
import AddVisitor from "./pages/AddVisitor";
import AddEmployee from "./pages/AddEmployee";
import EditVisitor from "./pages/EditVisitor";
import EditEmployee  from './pages/EditEmployee';
import PrintVisitor from './pages/VisitorPass';
import PreRegister from './pages/PreRegister';
import AddPreRegistration from './pages/AddPreRegister';
import EditPreregister from './pages/EditPreregister';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/visitors' element={<Visitors />} />
        <Route path="/add-visitor" element={<AddVisitor />} />
        <Route path="/edit-visitor/:id" element={<EditVisitor />} />
        <Route path="/print-visitorpass/:id" element={<PrintVisitor />} />
        <Route path='/employees' element={<Employees />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path='/preregister' element={<PreRegister />} />
        <Route path='/add-preregistration' element={<AddPreRegistration />} />
        <Route path='/edit-preregister/:id' element={<EditPreregister />} />
        <Route path='/checkinout' element={<CheckInOut />} />
      </Routes>
    </BrowserRouter>
  )
}