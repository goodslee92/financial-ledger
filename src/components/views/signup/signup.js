import React, {useState} from 'react';
import './signup.scss';
import axios from "axios";
import { useNavigate } from "react-router-native";
import { url } from '../../common/api'

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };
    const [id, setId] = useState();
    const idChangeHandler = (event) => {
        setId(event.target.value);
    };
    const [password, setPassword] = useState('');
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };
    const [isPasswordSame, setIsPasswordSame] = useState(false);
    const passwordCheckChangeHandler = (event) => {
        if (password === event.target.value) {
            setIsPasswordSame(true)
        }
    };
    const data = {
        id : id,
        password : password,
        name : name,
    };
    const onClickHandler = () => {
            const fetchData = async () => {
                await axios.post(url + '/api/registerAccount', data)
                    .then(res => {
                        // console.log(res.data)
                    }).catch(err => {
                        console.log(err)
                    })
            }
            fetchData();
            alert(data.name + "님의 가입을 환영합니다.");
            navigate('/');
    }
    const checkIdHandler = () => {
        const fetchData = async () => {
            await axios.post(url + '/api/checkId', data)
                .then(res => {
                    // console.log(res.data)
                    if (res.data[0] === undefined) {
                        alert('사용 가능한 ID입니다')
                    } else {
                        alert('이미 존재하는 ID입니다')
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
        fetchData();
}
    return (
        <div>
            <div>
                <h1>Sign Up</h1>
            </div>
            <div className='inputList'>
                <input className='name' name='name' type="name" placeholder='이름' onChange={nameChangeHandler} />
                <div className='su_id_container'>
                    <input className='su_id' name='id' type="id" placeholder='아이디' onChange={idChangeHandler} />
                    <button className='btn_checkId btn-gray' onClick={checkIdHandler}>중복 확인</button>
                </div>
                <input className='su_password' name='password' type="password" placeholder='비밀번호' onChange={passwordChangeHandler} />
                <input className='su_passwordCheck' name='passwordCheck' type="password" placeholder='비밀번호 확인' onChange={passwordCheckChangeHandler} />
                {
                    !isPasswordSame &&
                    <span className='su_password_check_msg'>비밀번호가 일치하지 않습니다.</span>
                }
                <button className="btn-signup btn-gray" onClick={onClickHandler} 
                    disabled={(id === null || password === null || !isPasswordSame)}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignUp;