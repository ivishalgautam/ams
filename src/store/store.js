import { configureStore } from "@reduxjs/toolkit";
import doctorSlice from "./features/doctor/doctorSlice";
import getDoctorSlice from "./features/doctor/getDoctorSlice";
import hospitalSlice from "./features/hospital/hospitalSlice";
import inputSlice from "./features/inputs/inputSlice";
import modalSlice from "./features/modal/modalSlice";
import navSlice from "./features/nav/navSlice";
import createHospitalSlice from "./features/hospital/createHospitalSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorSlice,
    doctor: getDoctorSlice,
    hospitals: hospitalSlice,
    createHospital: createHospitalSlice,
    inputs: inputSlice,
    modal: modalSlice,
    navMenu: navSlice,
  },
});
