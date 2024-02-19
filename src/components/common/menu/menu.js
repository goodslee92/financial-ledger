import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import '../menu/menu.scss';

const Menu = () => {
    const loginUserName = sessionStorage.getItem('loginUserName');
    return (
        <div className="menu_container">
            <div className='close_btn'>
                <IoCloseCircleOutline  />
            </div>
            { loginUserName === null ? (
                <div className='user_info_container'>
                    <div className='login_info'>
                        <input type="login_id" placeholder="ID"/>
                        <input type="login_pw" placeholder="Password"/>
                        <button className='login'>로그인</button>
                    </div>
                </div>
            ) : (
                <div className='user_info_container'>
                    <div className='profile_image'>
                        <CgProfile />
                    </div>
                    <div className='user_name'>
                        <span>홍길동</span>
                    </div>
                    <div className='btn_container'>
                        <button className='user_info_modify'>회원정보수정</button>
                        <button className='logout'>로그아웃</button>
                    </div>
                </div>
            )}
            { loginUserName === null ? (
                <div className='account_container'>
                    <button className='regist'>회원가입</button>
                    <button className='find_id'>아이디 찾기</button>
                    <button className='find_pw'>비밀번호 찾기</button>
                </div>
                ) : (
                    {}
                )
            }
            <div className='settings_container'>
                <button className='settings'>설정</button>
            </div>
        </div>
    )
}

export default Menu