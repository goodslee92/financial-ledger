import React, {useState} from 'react';
import Modal from 'react-modal';
import NewItem from "../../views/newItem/newItem";
import './roundBtn.scss';

const RoundBtn = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className='roundBtn_container'>
            <button className="plus_button" onClick={()=> setModalIsOpen(true)}>+</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <NewItem />
            </Modal>
        </div>
    )
}

export default RoundBtn