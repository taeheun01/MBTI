import axios from 'axios';

const API_URL = 'https://moneyfulpublicpolicy.co.kr';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
  
};

export const login = async (userData) => {
    try {
   const response = await axios.post(`${API_URL}/login`, {userData})
   const token = response.data.token

if (token) {
    localStorage.setItem('jwtToken', token);
}
return response.data;
} catch (error) {
    console.error('로그인 실패',error.response? error.response.data : error.message)
    return null
}
};


export const getUserProfile = async (token) => {
    try {
   const response = await axios.get(`${API_URL}/user`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
   })
   return response.data;
} catch (error) {
    console.error ('개인정보 불러오기 실패',error.response? error.response.data : error.message)
    return null;
}
}

export const updateProfile = async (formData) => {
     const token = localStorage.getItem('jwtToken');
     try {
        const response = await axios.put(`${API_URL}/profile`,formData, {
            headers: {
                AUthorization: `Bearer ${token}`,
                'Context-Type': 'multipart/form-data',
            }
        })
        return response.data;
     } catch (error) {
        console.error ('개인정보 수정실패',error.response? error.response.data : error.message)
    return null;
     }
};

//나중에 리팩토링하기 , 