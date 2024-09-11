import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

const Profile = ({ user, setUser, isLogin, accessToken }) => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState(user?.nickname || "");
    const [id, setId] = useState(user?.id || "");

    useEffect(() => {
        const userProfile = async () => {
            try {
                const response = await axios.get(`${API_URL}/user`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.data.success) {
                    const { id, nickname } = response.data;
                    setId(id);
                    setNickname(nickname);

                    setUser(response.data);
                } else {
                    alert("회원정보를 불러오지 못했습니다.");
                }
            } catch (error) {
                console.error("회원정보 오류오류", error);
                alert("정보를 불러오는중 오류가 발생했습니다.");
                navigate("/login");
            }
        };
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            userProfile();
        }
    }, [setUser]);

    // if (!isLogin) {
    //     alert("로그인을 해주십시오.");
    //     return <Navigate to="/login" />;
    // }

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(
                `${API_URL}/profile`,
                { nickname },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
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
    };

    return (
        <div>
            <h1>프로필 수정</h1>
            <div>
                <div>아이디 : </div> {id}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nickname">닉네임 : </label>
                    <input id="nickname" type="text" value={nickname} onChange={handleNicknameChange} />
                </div>
                <button type="submit">프로필 업데이트</button>
            </form>
        </div>
    );
};

export default Profile;
