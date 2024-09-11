import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

const Profile = async ({ user, setUser, isLogin }) => {
    if (!isLogin) {
        alert("로그인을 해주십시오.");
        return <Navigate to="/login" />;
    }
    const [nickname, setNickname] = useState(user?.nickname || "");

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    try {
        const response = await axios.patch(
            `${API_URL}/profile`,
            {
                Authorization: "Bearer AccessToken"
            },
            {
                nickname: nickname
            }
        );

        if (response.status === 200) {
            setUser({ ...user, nickname });
            alert("프로필이 수정되었습니다.");
        } else {
            alert("수정 실패");
        }
    } catch (error) {
        console.error("프로필 업데이트중 오류", error);
        alert("오류가 발생했습니다");
    }

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h1>프로필 수정</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="nickname" style={{ display: "block", marginBottom: "0.5rem" }}>
                        닉네임
                    </label>
                    <input id="nickname" type="text" value={nickname} onChange={handleNicknameChange} />
                </div>
                <button type="submit">프로필 업데이트</button>
            </form>
        </div>
    );
};

export default Profile;
