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
    const [id, setId] = useState();
    const idChangeHandler = (event) => {
        setId(event.target.value);
    };
    const [password, setPassword] = useState();
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };
    const data = {
        id : id,
        password : password,
    };
    const [userInfo, setUserInfo] = useState()
    const loginOnClickHandler = () => {
        console.log("data.id : " + data.id + ", data.password : " + data.password)
        const fetchData = async () => {
            await axios.post('http://localhost:3001/api/loginMemberInfo', data)
            .then(res => {
                console.log(res.data)
                setUserInfo(res.data)
                alert(res.data[0].user_name + "님 반갑습니다.");
                navigate('/Home');
            }).catch(err => {
                console.log(err)
                alert("ID 또는 비밀번호를 확인하세요.");
            })
        }
        fetchData()
        
    }
    return (
        <div className="root_container">
            <h1 className="title">타이틀</h1>
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
