import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Layout = ({ children, user, isLogin }) => {
    const navigate = useNavigate();
    useEffect(() => {}, [user]);

    const handleLogout = () => {
        alert("로그아웃이 되었습니다.");
        navigate("/");
    };

    return (
        <div>
            <header>
                <nav>
                    <Link to="/">홈</Link>
                    <div className="space-x-4">
                        {isLogin ? (
                            <>
                                <p>nickname님 어서오세요</p>
                                <Link to="/profile">프로필</Link>
                                <button onClick={handleLogout}>로그아웃</button>
                            </>
                        ) : (
                            <>
                                <p>로그인을 해주세요</p>
                                <Link to="/login">로그인</Link>
                                <Link to="/signup">회원가입</Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <main className="container mx-auto pt-10 main">{children}</main>
        </div>
    );
};

export default Layout;
