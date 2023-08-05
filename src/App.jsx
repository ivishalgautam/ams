import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import AllDoctors from "./pages/doctors/AllDoctors";
import CreateDoctor from "./pages/doctors/CreateDoctor";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorPage from "./pages/doctors/DoctorPage";

function App() {
  return (
    <div className="font-poppins">
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/doctors" element={<AllDoctors />} />
          <Route path="/doctors/add" element={<CreateDoctor />} />
          <Route path="/doctors/:doctorId" element={<DoctorPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
