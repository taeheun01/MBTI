import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

const Signup = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickName, setNickName] = useState("");

    const SignupHandle = async (e) => {
        e.preventDefault();
        //비밀번호 확인
        if (password == !confirmPassword) {
            alert("비밀번호가 틀렸습니다.");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/register`, {
                id: id,
                password: password,
                nickname: nickName
            });

            if (response.status === 201) {
                //회원가입 성공시
                alert("회원가입이 완료 되었습니다.");
                navigate("/login");
            } else {
                //회원가입 실패시
                alert("회원가입이 실패 하였습니다.");
            }
        } catch (error) {
            console.error("에러에러", error);
            alert("회원가입중 오류가 발생했습니다.");
        }
    };

    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={SignupHandle}>
                <label htmlFor="id">아이디 :</label>
                <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                <label htmlFor="password">비밀번호 : </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="confirmPassword">비밀번호 확인 :</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <label htmlFor="nickname">닉네임 :</label>
                <input type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} />
                <button type="submit">회원가입</button>
            </form>
        </>
    );
};

export default Signup;
