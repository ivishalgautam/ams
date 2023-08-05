import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  department_id: "",
  qualification: "",
  institution: "",
  address: "",
  location: "",
  fees: "",
  about: "",
  schedule_days: [],
  hospital_id: "",
};

const inputSlice = createSlice({
  name: "inputVals",
  initialState,
  reducers: {
    setFieldValue: (state, action) => {
      const { field, value } = action.payload;
      if (field in state) {
        state[field] = value;
      }
    },
    clearAllFields: () => initialState,
  },
});

export const { setFieldValue, clearAllFields } = inputSlice.actions;
export default inputSlice.reducer;
