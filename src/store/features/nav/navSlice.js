import { createSlice } from "@reduxjs/toolkit";

const navList = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    type: "link",
  },
  {
    id: 2,
    name: "Manage Doctors",
    type: "dropdown",
    submenu: [
      {
        id: 3,
        name: "All Doctors",
        path: "/doctors",
        type: "link",
      },
      {
        id: 4,
        name: "Create new doctor",
        path: "/doctors/add",
        type: "link",
      },
    ],
  },
  {
    id: 5,
    name: "Hospitals",
    type: "dropdown",
    submenu: [
      {
        id: 6,
        name: "Manage hospitals",
        path: "/hospitals",
        type: "link",
      },
      {
        id: 7,
        name: "Create new hospital",
        path: "/hospitals/add",
        type: "link",
      },
    ],
  },
];

const navSlice = createSlice({
  name: "nav",
  initialState: {
    navList,
  },
  reducers: {},
});

export default navSlice.reducer;
