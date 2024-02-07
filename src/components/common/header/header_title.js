import { useNavigate } from "react-router-native";
// import { useLocation } from 'react-router-dom';

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
    return (
        <div className="header_title_container">
            <span className="loginUserName">    
                {
                    sessionStorage.getItem('loginUserName') === null ? 'Guest' : sessionStorage.getItem('loginUserName')
                } 님
            </span>
            <h3 className="headerTitleH3">마이머니북</h3>
            <button className="logInOutBtn btn-gray" onClick={logInOutBtnOnclickHandler}>
                {
                    sessionStorage.getItem('loginUserName') === null ? 'Login' : 'Logout'
                }
            </button>
        </div>
    )
}

export default HeaderTitle