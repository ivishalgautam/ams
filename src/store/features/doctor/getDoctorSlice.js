import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../../requestMethods";

export const getDoctorById = createAsyncThunk(
  "doctor/getDoctor",
  async ({ doctorId }, thunkAPI) => {
    try {
      const resp = await publicRequest.get(`/doctors/${doctorId}`);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  doctor: {},
  isError: false,
  error: null,
};

const getDoctorSlice = createSlice({
  name: "getDoctor",
  initialState,
  reducers: {
    clearDoctor: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getDoctorById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isError = null;
    });
    builder.addCase(getDoctorById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.doctor = action.payload;
      state.isError = false;
      state.isError = null;
    });
    builder.addCase(getDoctorById.rejected, (state, action) => {
      state.isLoading = false;
      state.doctor = {};
      state.isError = true;
      state.isError = action.payload;
    });
  },
});

export const { clearDoctor } = getDoctorSlice.actions;
export default getDoctorSlice.reducer;
