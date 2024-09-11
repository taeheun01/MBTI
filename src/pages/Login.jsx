import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

const Login = ({ setIsLogin }) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const LoginHandle = async (e) => {
        e.preventDefault();
        try {
            //서버통신 로그인 api에 user가 입력한값 전송 (await)
            const response = await axios.post(`${API_URL}/login`, {
                id: id,
                password: password
            });

            if (response.status === 200) {
                setIsLogin(true);
                navigate("/");
            } else {
                alert("로그인이 실패했습니다.");
            }
        } catch (error) {
            console.error("에러에러", error);
            alert("로그인하는 동안 오류가 발생했습니다 ");
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={LoginHandle}>
                <label htmlFor="id">아이디 :</label>
                <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                <label htmlFor="password">비밀번호 :</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
