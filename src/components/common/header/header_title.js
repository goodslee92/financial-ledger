import React, { useState } from 'react';
import { useNavigate } from "react-router-native";
import { IoMenu } from "react-icons/io5";
import Modal from 'react-modal';
import Menu from '../menu/menu';
const HeaderTitle = () => {
    const navigate = useNavigate();
    // const location = useLocation();

    const clearStorage = () => {
        sessionStorage.clear();
        window.location.reload();
    };
    const logInOutBtnOnclickHandler = () => {
        if (sessionStorage.getItem('loginUserName') === null) {
            // console.log('location.pathname : ' + location.pathname)
            // sessionStorage.setItem('prevPath', location.pathname)
            navigate('/');
        } else {
            clearStorage();
        }
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const onCloseHandler = () => {
        setModalIsOpen(false)
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
        </div>
    )
}

export default HeaderTitle