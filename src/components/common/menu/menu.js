import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import '../menu/menu.scss';

const Menu = ({isOpen, onClose}) => {
    const loginUserName = sessionStorage.getItem('loginUserName');
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
                        <button className='user_info_modify'><FaUserEdit />회원정보수정</button>
                        <button className='logout'><RiLogoutBoxLine />로그아웃</button>
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