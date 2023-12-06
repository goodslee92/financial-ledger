import {useNavigate} from "react-router-native";
import React, {useState} from 'react';
import axios from "axios";
import './index.scss';

function Index() {
    const id_max_length = 12;
    const pw_max_length = 20;
    const navigate = useNavigate();
    const navigateToSignUp = () => {
        navigate("/SignUp");
    }
    const [enteredId, setEnteredId] = useState();
    const idChangeHandler = (event) => {
        setEnteredId(event.target.value);
    };
    const [enteredPw, setEnteredPw] = useState();
    const passwordChangeHandler = (event) => {
        setEnteredPw(event.target.value);
    };
    const navigation = () => {
        const path = sessionStorage.getItem('prevPath');
        console.log('prevPath : ' + path);
        switch (path) {
            case '/Home' :
                return navigate('/Home')
            case '/Calendar' :
                return navigate('/Calendar')
            case '/Daily' :
                return navigate('/Daily')
            case '/Statistics' :
                return navigate('/Statistics')
            case '/SignUp' :
                return navigate('/SignUp')
            default :
                return navigate('/Home')
        }
    }
    const data = {
        id : enteredId,
        password : enteredPw,
    };
    // 세션 스토리지
    const sessionStorage = window.sessionStorage;
    // 로그인 버튼 핸들러
    const loginOnClickHandler = () => {
        console.log("data.id : " + data.id + ", data.password : " + data.password)
        const fetchData = async () => {
            await axios.post('http://localhost:3001/api/loginMemberInfo', data)
            .then(res => {
                console.log(res.data)
                if (res.data[0].user_pw === enteredPw) {
                    alert(res.data[0].user_name + "님 반갑습니다.");
                    sessionStorage.setItem("loginUserId", res.data[0].user_id)
                    sessionStorage.setItem("loginUserName", res.data[0].user_name)
                    console.log("loginId: " + sessionStorage.getItem("loginUserId"));
                    navigation()
                } else {
                    alert("ID 또는 비밀번호를 확인하세요.");
                }
            }).catch(err => {
                console.log(err)
                alert("ID 또는 비밀번호를 확인하세요.");
            })
        }
        fetchData()
    }
    
    return (
        <div className="root_container">
            <h1 className="title">가계부</h1>
            <div className="input_container">
                <input className="id" type="id" placeholder="ID" maxLength={id_max_length} onChange={idChangeHandler} required /><br />
                <input className="password" type="password" placeholder="Password" maxLength={pw_max_length} onChange={passwordChangeHandler}/><br />
            </div>
            <div className="btn_container">
                <button className="sign_up btn-gray" onClick={navigateToSignUp}>Sign Up</button>
                <button className="sign_in btn-gray" onClick={loginOnClickHandler}>Log In</button>
            </div>
        </div>
    );
}

export default Index;
