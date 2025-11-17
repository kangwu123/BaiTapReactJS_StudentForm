import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "studentRegister",
  initialState: {
    students: [],
  },
  reducers: {
    addStudentRegister: (state, action) => {
      state.students.push(action.payload);
    },
  },
});

export const { addStudentRegister } = studentSlice.actions;

export default studentSlice.reducer;
