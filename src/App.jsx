import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import TestPage from "./pages/TestPage";
import TestResultPage from "./pages/TestResultPage";
import { useState } from "react";

const App = () => {
    const [user, setUser] = useState();
    const [isLogin, setIsLogin] = useState(false);

    return (
        <BrowserRouter>
            <Layout isLogin={isLogin} user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login setIsLogin={setIsLogin} />}></Route>
                <Route path="/profile" element={<Profile isLogin={isLogin} />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/testpage" element={<TestPage />}></Route>
                <Route path="/testresultpage" element={<TestResultPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
