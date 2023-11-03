import { Link } from 'react-router-dom';
import React from 'react';

function Nav() {
    return (
        <div>
            <div className="navbar">
                <Link className="navbarMenu" to={'/'}>Home</Link>
                <Link className="navbarMenu" to={'/calendar'}>달력</Link>
                <Link className="navbarMenu" to={'/daily'}>일일</Link>
                <Link className="navbarMenu" to={'/statistics'}>통계</Link>
            </div>
        </div>
    );
}

export default Nav;