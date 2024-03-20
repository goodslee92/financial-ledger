import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import axios from "axios";
import { url } from '../../common/api'
import '../menu/menu.scss';

const Menu = ({isOpen, onClose}) => {
    const [isNeedRerender, setIsNeedRerender] = useState(false);    // 로그인, 로그아웃시 화면 리렌더링을 위한 상태값
    const loginUserName = sessionStorage.getItem('loginUserName');
    const [enteredId, setEnteredId] = useState();
    const idChangeHandler = (event) => {
        setEnteredId(event.target.value);
    };
    const [enteredPw, setEnteredPw] = useState();
    const passwordChangeHandler = (event) => {
        setEnteredPw(event.target.value);
    };
    const data = {
        id : enteredId,
        password : enteredPw,
    };
    const clearStorage = () => {
        sessionStorage.clear();
        setIsNeedRerender(true);
    };
    const logInOutBtnOnclickHandler = () => {
        if (sessionStorage.getItem('loginUserName') === null) {
            const fetchData = async () => {
                await axios.post(url + '/api/loginMemberInfo', data)
                .then(res => {
                    if (res.data[0].user_pw === enteredPw) {
                        sessionStorage.setItem("loginUserId", res.data[0].user_id)
                        sessionStorage.setItem("loginUserName", res.data[0].user_name)
                        console.log("loginId: " + sessionStorage.getItem("loginUserId"));
                        setIsNeedRerender(false);
                    } else {
                        alert("ID 또는 비밀번호를 확인하세요.");
                    }
                }).catch(err => {
                    console.log(err)
                    alert("ID 또는 비밀번호를 확인하세요.");
                })
            }
            fetchData()
        } else {
            clearStorage();
        }
    }
    return (
        <div className="menu_container">
            <div>
                <button className='close_btn' onClick={onClose}>
                    <IoCloseCircleOutline />
                </button>
            </div>
            { loginUserName === null ? (
                <div className='user_info_container'>
                    <div className='login_info'>
                        <input type="login_id" placeholder="ID" onChange={idChangeHandler} required/>
                        <input type="login_pw" placeholder="Password" onChange={passwordChangeHandler}/>
                        <button className='login' onClick={logInOutBtnOnclickHandler}>로그인</button>
                    </div>
                </div>
            ) : (
                <div className='user_info_container'>
                    <div className='profile_image'>
                        <CgProfile />
                    </div>
                    <div className='user_name'>
                        <span>{loginUserName}</span>
                    </div>
                    <div className='btn_container'>
                        <button className='user_info_modify'><FaUserEdit />회원정보수정</button>
                        <button className='logout' onClick={logInOutBtnOnclickHandler}><RiLogoutBoxLine />로그아웃</button>
                    </div>
                </div>
            )}
            <div className='settings_container'>
                <button className='settings'><AiFillSetting />설정</button>
            </div>
        </div>
    )
}

export default Menu