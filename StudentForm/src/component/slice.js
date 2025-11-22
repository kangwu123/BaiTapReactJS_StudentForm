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
    deleteStudent: (state, action) => {
      state.students = state.students.filter((student, index) => index !== action.payload);
    },
    editStudent: (state, action) => {
      const { index, updatedStudent } = action.payload;
      state.students[index] = updatedStudent;
    },
  },
});

export const { addStudentRegister, deleteStudent, editStudent } = studentSlice.actions;

export default studentSlice.reducer;
