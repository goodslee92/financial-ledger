import React, { useState } from 'react';
import { BackHandler } from 'react-native';
import { IoMenu } from "react-icons/io5";
import Modal from 'react-modal';
import Menu from '../menu/menu';
import { RiLogoutBoxLine } from "react-icons/ri";

const HeaderTitle = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const onCloseHandler = () => {
        setModalIsOpen(false);
    }
    const exitOnClickHandler = () => {
        if (window.confirm('마이머니북을 종료하시겠습니까?')) {
            BackHandler.exitApp();
        } else {
            console.log('Cancel Pressed');
        }
    }
    return (
        <div className="header_title_container">
            <div className="menu_button" onClick={()=> setModalIsOpen(true)}>
                <IoMenu  />
            </div>
            <h3 className="headerTitleH3">마이머니북</h3>
            <Modal className='menuModal' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                <Menu isOpen={modalIsOpen} onClose={onCloseHandler} />
            </Modal>
            <div className='exit_button'>
                <button className='exit_app_btn' onClick={exitOnClickHandler}><RiLogoutBoxLine /></button>
            </div>
        </div>
    )
}

export default HeaderTitle