import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../../requestMethods";
import { toast } from "react-toastify";

export const createHospital = createAsyncThunk(
  "hospital/create",
  async (inputs) => {
    const resp = await publicRequest.post("/hospitals", {
      ...inputs,
      departments: JSON.stringify(inputs.departments),
    });
    if (resp.status === 200) {
      toast.success(`Hospital ${resp.data.name} created!`);
    }
    return resp.data;
  }
);

const createHospitalSlice = createSlice({
  name: "createHospital",
  initialState: {
    isLoading: false,
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createHospital.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(createHospital.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(createHospital.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error.message;
    });
  },
});

export default createHospitalSlice.reducer;
