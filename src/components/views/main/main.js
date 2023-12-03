import {useNavigate} from "react-router-native";
import React from "react";
import './main.scss';

function Main() {
    const id_max_length = 12;
    const pw_max_length = 20;
    const navigate = useNavigate();
    const navigateToSignUp = () => {
        navigate("/SignUp");
    }
    const navigateToSignIn = () => {
        navigate("/SignIn");
    }
    return (
        <div className="root_container">
            <h1 className="title">대충 급조 해서 만든 가계부</h1>
            <div className="input_container">
                <input className="id" type="text" placeholder="ID" maxLength={id_max_length} required /><br />
                <input className="password" type="text" placeholder="Password" maxLength={pw_max_length} /><br />
            </div>
            <div className="btn_container">
                <button className="sign_up btn-gray" onClick={navigateToSignUp}>회원가입</button>
                <button className="sign_in btn-gray" onClick={navigateToSignIn}>로그인</button>
            </div>
        </div>
    );
}

export default Main;
