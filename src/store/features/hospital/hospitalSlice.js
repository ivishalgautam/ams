import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../../requestMethods";

export const getHospitals = createAsyncThunk(
  "hospital/getHospitals",
  async () => {
    const resp = await publicRequest.get("/hospitals");
    // console.log("hospitals", resp.data);
    return resp.data;
  }
);

export const getDeparts = createAsyncThunk(
  "hospital/getDepartments",
  async () => {
    const resp = await publicRequest.get("/sectors");
    // console.log("departs", resp.data);
    return resp.data;
  }
);

const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    isLoading: false,
    hospitals: [],
    departments: [],
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // hospitals
    builder.addCase(getHospitals.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getHospitals.fulfilled, (state, action) => {
      state.isLoading = false;
      state.hospitals = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getHospitals.rejected, (state, action) => {
      state.isLoading = false;
      state.hospitals = [];
      state.isError = true;
      state.error = action.error.message;
    });

    // department
    builder.addCase(getDeparts.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getDeparts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.departments = action.payload;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(getDeparts.rejected, (state, action) => {
      state.isLoading = false;
      state.departments = [];
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default hospitalSlice.reducer;
