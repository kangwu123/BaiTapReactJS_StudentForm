import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import StudentForm from "./form/StudentForm";

const MainTemplate = () => {
    return (
        <div className="relative min-h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/img/backgroundUniversity.jpg')" }}
            ></div>

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10">
                <Header />

                <StudentForm />

                <Footer />
            </div>
        </div>
    );
};

export default MainTemplate;
