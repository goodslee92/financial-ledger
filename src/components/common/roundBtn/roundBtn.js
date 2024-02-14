import React, { createContext, useState } from 'react';
import Modal from 'react-modal';
import NewItem from "../../views/newItem/newItem";
import './roundBtn.scss';

export const ModalContext = createContext();
export const ModalDispatchContext = createContext({
    open: () => {},
    close: () => {}
});

const RoundBtn = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const onSubmitHandler = () => {
        setModalIsOpen(false)
    }
    const onCancelHandler = () => {
        setModalIsOpen(false)
    }
    return (
        <div className='roundBtn_container'>
            <button className="plus_button" onClick={()=> setModalIsOpen(true)}>+</button>
            <Modal className='newItemModal' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
                <NewItem isOpen={modalIsOpen} onCancel={onCancelHandler} onSubmit={onSubmitHandler} />
            </Modal>
        </div>
    )
}

export default RoundBtn