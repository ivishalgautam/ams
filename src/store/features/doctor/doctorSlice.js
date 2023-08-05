import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../../requestMethods";
import { toast } from "react-toastify";

export const getDoctors = createAsyncThunk("doctor/getAllDoctors", async () => {
  const resp = await publicRequest.get("/doctors");
  return resp.data;
});

export const updateDoctor = createAsyncThunk(
  "doctor/update",
  async ({ doctorId, data }) => {
    const resp = await publicRequest.put(`/doctors/${doctorId}`, { ...data });
    if (resp.status === 200) {
      toast.success(`Dr. ${resp.data.fullname} updated.`);
    }
    return resp.data;
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctor/delete",
  async ({ doctorId, data }) => {
    const confirmation = confirm("Are you sure you want to delete.");
    if (confirmation) {
      const resp = await publicRequest.put(`/doctors/${doctorId}`, {
        ...data,
      });
      if (resp.status === 200) {
        toast.success(`Dr. ${resp.data.fullname} deleted.`);
      }
      return resp.data;
    }
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    isLoading: false,
    doctors: [],
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get all doctors
    builder.addCase(getDoctors.pending, (state) => {
      state.isLoading = true;
      state.doctors = [];
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getDoctors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.doctors = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getDoctors.rejected, (state, action) => {
      state.isLoading = false;
      state.doctors = [];
      state.isError = true;
      state.error = action.error.message;
    });

    // update a doctor
    builder.addCase(updateDoctor.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(updateDoctor.fulfilled, (state, action) => {
      state.isLoading = false;
      const filteredDoctors = state.doctors.map((doctor) => {
        if (doctor.id === action.payload.id) {
          return { ...action.payload };
        }
        return doctor;
      });
      state.doctors = filteredDoctors;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(updateDoctor.rejected, (state, action) => {
      state.isError = true;
      state.error = action.error.message;
    });

    // delete a doctor
    builder.addCase(deleteDoctor.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(deleteDoctor.fulfilled, (state, action) => {
      state.isLoading = false;
      const filteredDoctors = state.doctors.map((doctor) => {
        if (doctor.id === action.payload.id) {
          return { ...action.payload };
        }
        return doctor;
      });
      state.doctors = filteredDoctors;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(deleteDoctor.rejected, (state, action) => {
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

// export const {} = doctorSlice.actions
export default doctorSlice.reducer;
