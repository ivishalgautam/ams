import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import AllDoctors from "./pages/doctors/AllDoctors";
import CreateDoctor from "./pages/doctors/CreateDoctor";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorPage from "./pages/doctors/DoctorPage";
import HospitalsPage from "./pages/hospitals/HospitalsPage";
import CreateHospital from "./pages/hospitals/CreateHospital";
import HospitalPage from "./pages/hospitals/HospitalPage";

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
          <Route path="/hospitals" element={<HospitalsPage />} />
          <Route path="/hospitals/add" element={<CreateHospital />} />
          <Route path="/hospitals/:hospitalId" element={<HospitalPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
