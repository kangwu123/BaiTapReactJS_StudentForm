import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addStudentRegister, deleteStudent, editStudent } from "./../slice";

const StudentForm = () => {
    // Đẩy dữ liệu lên store
    const dispatch = useDispatch();

    // Lấy dữ liệu xuống từ store
    const dataStudents = useSelector((state) => {
        return state.studentRegisterReducer.students
    }
    );

    // Tạo một object về nhập input
    const [userRegister, setUserRegister] = useState({
        studentId: "",
        fullName: "",
        phone: "",
        email: ""
    });

    // Tạo một object về lỗi
    const [error, setError] = useState({
        studentId: "",
        fullName: "",
        phone: "",
        email: ""
    });

    // Tạo một object về hợp lệ valid
    const [valid, setValid] = useState(true);

    // State để theo dõi sinh viên đang được chỉnh sửa
    const [editingIndex, setEditingIndex] = useState(null);

    // Sử dụng useEffect để reset form khi không có sinh viên nào được chỉnh sửa
    useEffect(() => {
        if (editingIndex === null) {
            setUserRegister({ studentId: "", fullName: "", phone: "", email: "" });
            setError({ studentId: "", fullName: "", phone: "", email: "" });
        }
    }, [editingIndex]);

    // Sử dụng useMemo để tính toán số lượng sinh viên
    const studentCount = useMemo(() => {
        return dataStudents.length;
    }, [dataStudents]);

    // Sử dụng useCallback cho hàm xóa sinh viên
    const handleDelete = useCallback((index) => {
        dispatch(deleteStudent(index));
    }, [dispatch]);

    // Sử dụng useCallback cho hàm chỉnh sửa sinh viên
    const handleEdit = useCallback((student, index) => {
        setUserRegister(student);
        setEditingIndex(index);
        setError({ studentId: "", fullName: "", phone: "", email: "" });
    }, []);

    // Sử dụng useCallback cho hàm hủy chỉnh sửa
    const handleCancelEdit = useCallback(() => {
        setEditingIndex(null);
        setUserRegister({ studentId: "", fullName: "", phone: "", email: "" });
        setError({ studentId: "", fullName: "", phone: "", email: "" });
    }, []);

    const checkValidForm = (newUserRegister, newError) => {
        // Kiểm tra xem có trường nào rỗng không
        for (let key in newUserRegister) {
            if (!newUserRegister[key].trim()) {
                return false; // Có trường rỗng → không hợp lệ
            }
        }

        // Kiểm tra xem có lỗi định dạng không
        for (let key in newError) {
            if (newError[key] !== "") {
                return false;
            }
        }

        return true;
    };

    const handleChangeInput = (event) => {
        const { id, value } = event.target;

        // Cập nhật giá trị mới
        const newUserRegister = {
            ...userRegister,
            [id]: value,
        };

        // Kiểm tra lỗi rỗng
        let newError = { ...error };

        const fieldNames = {
            studentId: "Mã sinh viên",
            fullName: "Họ và tên",
            phone: "Số điện thoại",
            email: "Email"
        };

        if (value.trim() === "") {
            newError[id] = `${fieldNames[id]} không được để trống`;
        } else {
            newError[id] = "";

            // Kiểm tra định dạng
            switch (id) {
                case "studentId": {
                    const studentIdRegex = /^[A-Za-z0-9]{3,10}$/;
                    if (!studentIdRegex.test(value)) {
                        newError[id] = `${id} không đúng định dạng`;
                    }
                    break;
                }
                case "fullName": {
                    const fullNameRegex = /^[A-Za-zÀ-ỹ\s]{1,50}$/;
                    if (!fullNameRegex.test(value)) {
                        newError[id] = `${id} không đúng định dạng`;
                    }
                    break;
                }
                case "phone": {
                    const phoneRegex = /^\d{10,12}$/;
                    if (!phoneRegex.test(value)) {
                        newError[id] = `${id} không đúng định dạng`;
                    }
                    break;
                }
                case "email": {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        newError[id] = `${id} không đúng định dạng`;
                    }
                    break;
                }
            }
        }

        // Cập nhật state
        setUserRegister(newUserRegister);

        setError(newError);

        checkValidForm(newUserRegister, newError)
    };

    // Sử dụng useCallback cho hàm submit
    const handleSubmit = useCallback((event) => {
        event.preventDefault();

        let newError = {};
        let hasEmpty = false;
        const fieldNames = {
            studentId: "Mã sinh viên",
            fullName: "Họ và tên",
            phone: "Số điện thoại",
            email: "Email"
        };

        for (let key in userRegister) {
            if (!userRegister[key].trim()) {
                newError[key] = `${fieldNames[key]} không được để trống`;
                hasEmpty = true;
            } else {
                newError[key] = "";
            }
        }

        setError(newError);

        if (hasEmpty) return;

        if (editingIndex !== null) {
            // Cập nhật sinh viên
            dispatch(editStudent({ index: editingIndex, updatedStudent: userRegister }));
            setEditingIndex(null);
        } else {
            // Thêm sinh viên mới
            dispatch(addStudentRegister(userRegister));
        }

        // Reset form sau khi submit
        setUserRegister({ studentId: "", fullName: "", phone: "", email: "" });
        setError({ studentId: "", fullName: "", phone: "", email: "" });
        setValid(false);
    }, [userRegister, editingIndex, dispatch]);


    return (
        <section className="py-8 flex justify-center items-center">
            <div className="container mx-auto">
                <div className="w-[90%] mx-auto">
                    <div className="flex justify-between items-center gap-10">

                        <div>
                            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight drop-shadow-2xl text-center">
                                🎓 Hệ thống <span className="text-amber-400">đăng ký sinh viên</span>
                            </h1>
                            <p className="text-lg md:text-xl mb-6 max-w-lg text-gray-200 leading-relaxed">
                                Cổng thông tin <span className="font-semibold text-white">đăng ký sinh viên</span> giúp bạn dễ dàng tạo tài khoản, cập nhật hồ sơ và quản lý học tập mọi lúc mọi nơi.
                            </p>
                            <p className="text-gray-300 italic max-w-md">
                                Bắt đầu hành trình học tập của bạn ngay hôm nay và tận hưởng trải nghiệm quản lý học tập <span className="text-amber-400 font-medium">thông minh &amp; thuận tiện</span>!
                            </p>
                        </div>

                        <div className="w-full md:w-2/5 flex flex-col justify-center items-center rounded-3xl bg-white/10 backdrop-blur-sm p-8 shadow-2xl">
                            <div className="w-full flex flex-col space-y-8">
                                <h2 className="text-3xl font-extrabold mb-10 text-center text-white tracking-wide">
                                    Thông tin sinh viên
                                </h2>
                                <form
                                    className="flex flex-col gap-4"
                                    action="#"
                                    method="POST"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="flex flex-col">
                                        <label htmlFor="studentId" className="text-white font-semibold mb-2">Mã Sinh viên</label>
                                        <input type="text" id="studentId" name="studentId" placeholder="Nhập mã sinh viên" value={userRegister.studentId} className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                            onChange={handleChangeInput}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{error.studentId} </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="fullName" className="text-white font-semibold mb-2">Họ và Tên</label>
                                        <input type="text" id="fullName" name="fullName" placeholder="Nhập họ và tên" value={userRegister.fullName} className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                            onChange={handleChangeInput}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{error.fullName} </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="phone" className="text-white font-semibold mb-2">Số điện thoại</label>
                                        <input type="text" id="phone" name="phone" placeholder="Nhập số điện thoại" value={userRegister.phone} className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                            onChange={handleChangeInput}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{error.phone} </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="text-white font-semibold mb-2">Email</label>
                                        <input type="email" id="email" name="email" placeholder="Nhập email" value={userRegister.email} className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                            onChange={handleChangeInput}
                                        />
                                        <p className="text-red-500 text-sm mt-1">{error.email} </p>
                                    </div>
                                    <div className="text-center flex gap-4 justify-center">
                                        <button type="submit" className="px-10 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                                            {editingIndex !== null ? 'Cập nhật sinh viên' : 'Thêm sinh viên'}
                                        </button>
                                        {editingIndex !== null && (
                                            <button 
                                                type="button" 
                                                onClick={handleCancelEdit}
                                                className="px-10 py-3 bg-gray-500 text-white font-bold rounded-xl hover:bg-gray-600 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                                            >
                                                Hủy
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-12">
                        <div className="w-full overflow-x-auto rounded-xl shadow-lg">
                            <table className="w-full divide-y divide-gray-300">
                                <thead className="bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Mã Sinh viên</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Họ và Tên</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Số điện thoại</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Email</th>
                                        <th className="px-6 py-4 text-left text-gray-200 font-semibold">Hành động</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-300">
                                    {dataStudents.map((student, index) => (
                                        <tr key={index} className="hover:bg-indigo-50 transition">
                                            <td className="px-6 py-4">{student.studentId}</td>
                                            <td className="px-6 py-4">{student.fullName}</td>
                                            <td className="px-6 py-4">{student.phone}</td>
                                            <td className="px-6 py-4">{student.email}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => handleEdit(student, index)}
                                                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Sửa
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(index)}
                                                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Xóa
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentForm
