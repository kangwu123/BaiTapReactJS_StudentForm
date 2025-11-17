import React from 'react'

const Header = () => {
    return (
        <>
            <header>
                <div className="container mx-auto z-10 flex justify-between items-center py-6 text-white">
                    <div className="text-4xl font-bold tracking-widest">
                        <span className="text-amber-400">Kangwu</span>
                    </div>

                    <nav>
                        <ul className="flex justify-between items-center gap-12 text-lg font-semibold">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-400 transform hover:scale-105 transition-all duration-300"
                                >
                                    Trang chủ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-400 transform hover:scale-105 transition-all duration-300"
                                >
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-400 transform hover:scale-105 transition-all duration-300"
                                >
                                    Khóa học
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-400 transform hover:scale-105 transition-all duration-300"
                                >
                                    Liên hệ
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center space-x-3">
                        <p className="text-white font-medium text-lg">
                            Xin chào,
                            <span className="text-amber-400 font-semibold hover:text-amber-300 transition-colors duration-300">
                                Khang Vu
                            </span>
                        </p>
                        <div className="w-15 h-15 border-2 border-amber-500 rounded-full overflow-hidden">
                            <img src="./img/avatarLogo.jpg" alt="avatar" className="w-full h-full transition-all duration-300 hover:scale-110 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
