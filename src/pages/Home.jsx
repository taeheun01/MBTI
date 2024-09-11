import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>무료 성격 테스트</h1>
            <p>나 자신을 알아보세요</p>
            <button onClick={navigate("/testpage")}>테스트 시작하기</button>
        </>
    );
};

export default Home;
