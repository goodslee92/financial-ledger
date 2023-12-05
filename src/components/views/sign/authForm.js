import React, {useEffect, useState} from 'react';
import './authform.scss';
import axios from "axios";
import { useNavigate } from "react-router-native";

const AuthForm = ({type}) => {
    console.log("type : " + type)
    const navigate = useNavigate();
    const [name, setName] = useState();
    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };
    const [id, setId] = useState();
    const idChangeHandler = (event) => {
        setId(event.target.value);
    };
    const [password, setPassword] = useState();
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
        console.log("type : " + type)
        if (type === 'SignUp') {
            const fetchData = async () => {
                await axios.post('http://localhost:3001/api/registerAccount', data)
                    .then(res => {
                        console.log(res.data)
                    }).catch(err => {
                        console.log(err)
                    })
            }
            fetchData();
            alert("회원가입 완료.");
            navigate('/');
        } else {
            // TODO NOT YET IMPLEMENTED.
        }

    }
    return (
        <div>
            <div>
                <h1>{type === 'SignUp' ? 'Sign Up' : 'Log In'}</h1>
            </div>
            <div className='inputList'>
                {
                    type === 'SignUp' && <input className='name' name='name' type="name" placeholder='이름' onChange={nameChangeHandler} />
                }
                <input className='id' name='id' type="id" placeholder='아이디' onChange={idChangeHandler} />
                <input className='password' name='password' type="password" placeholder='비밀번호' onChange={passwordChangeHandler} />
                {
                    type === 'SignUp' &&
                    <input className='passwordCheck' name='passwordCheck' type="password" placeholder='비밀번호 확인' onChange={passwordCheckChangeHandler} />
                }
                {
                    !isPasswordSame &&
                    <span>비밀번호가 일치하지 않습니다.</span>
                }
                <button className="btn-signup btn-gray" onClick={onClickHandler} disabled={(id === null || password === null || !isPasswordSame)}>
                    {type === 'SignUp' ? 'Sign Up' : 'Log In'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;