import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addStudentRegister } from "./../slice";

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
    console.log(userRegister);

    // Tạo một object về lỗi
    const [error, setError] = useState({
        studentId: "",
        fullName: "",
        phone: "",
        email: ""
    });

    // Tạo một object về hợp lệ valid
    const [valid, setValid] = useState(true);

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

    const handleSubmit = (event) => {
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

        dispatch(addStudentRegister(userRegister));

        // Reset form sau khi submit
        setUserRegister({ studentId: "", fullName: "", phone: "", email: "" });
        setError({ studentId: "", fullName: "", phone: "", email: "" });
        setValid(false);
    };


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
                                    <div className="text-center">
                                        <button type="submit" className="px-10 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                                            Thêm sinh viên
                                        </button>
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
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-300">
                                    {dataStudents.map((student, index) => (
                                        <tr key={index} className="hover:bg-indigo-50 transition">
                                            <td className="px-6 py-4">{student.studentId}</td>
                                            <td className="px-6 py-4">{student.fullName}</td>
                                            <td className="px-6 py-4">{student.phone}</td>
                                            <td className="px-6 py-4">{student.email}</td>
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
