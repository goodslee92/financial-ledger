import { Link } from 'react-router-dom';
import React from 'react';

function Nav() {
    return (
        <div>
            <div className="navbar">
                <Link className="navbarMenu" to={'/Home'}>내역 추가</Link>
                <Link className="navbarMenu" to={'/Calendar'}>달력</Link>
                <Link className="navbarMenu" to={'/Daily'}>일일</Link>
                <Link className="navbarMenu" to={'/Statistics'}>통계</Link>
            </div>
        </div>
    );
}

export default Nav;