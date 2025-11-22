import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "studentRegister",
  initialState: {
    students: [
      {
        studentId: "SV001",
        fullName: "Vũ Gia Khang",
        phone: "0768957156",
        email: "khangvu250296@gmail.com"
      },
      {
        studentId: "SV002", 
        fullName: "Trần Thùy Linh",
        phone: "0352678410",
        email: "thuylinhtran@gmail.com"
      },
      {
        studentId: "SV003",
        fullName: "Nguyễn Minh Hằng",
        phone: "0335267806",
        email: "levanc@gmail.com"
      },
      {
        studentId: "SV004",
        fullName: "Đinh Tuấn Khải",
        phone: "0891465021",
        email: "tuankhai@gmail.com"
      }
    ],
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
