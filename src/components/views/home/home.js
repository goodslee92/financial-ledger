import NewItem from '../newItem/newItem'
import React, { useState } from "react";
import Nav from '../../common/nav/nav'
import HeaderTitle from '../../common/header/header_title';

const Home = () => {
    const [isVisibility, setNewItemFormVisibility] = useState(false);
    const startNewItemHandler = () => {
        setNewItemFormVisibility(true);
    }
    const cancleNewItemHandler = () => {
        setNewItemFormVisibility(false);
    };

    return (
        <div className='home_root_container'>
            <HeaderTitle />
            <Nav />
            <div className="home_content_container">
                { !isVisibility && (
                    <button className="add-new-item-button" onClick={startNewItemHandler}>내역 추가하기</button>
                ) }
                { isVisibility && (<NewItem />)}
            </div>
        </div>
    )
}

export default Home