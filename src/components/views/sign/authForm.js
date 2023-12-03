import React from 'react';
import './authform.scss';

const AuthForm = ({type}) => {
    console.log("type : " + type)
    return (
        <div>
            <div>
                <h1>{type === 'SignUp' ? '회원가입' : '로그인'}</h1>
            </div>
            <div className='inputList'>
                <input
                    // value={user.id} onChange={onChange}
                    className='id' name='id' type="id" placeholder='아이디'></input>
                <input
                    // value={user.password} onChange={onChange}
                    className='password' name='password' type="password" placeholder='비밀번호'></input>
                {type === 'SignUp' &&
                    <input
                        // value={user.passwordCheck} onChange={onChange}
                        className='passwordCheck' name='passwordCheck' type="password" placeholder='비밀번호 확인'></input>
                }
                {
                    // !isPassword &&
                    <span>비밀번호를 다시 입력해주세요</span>
                }
                <button className="btn-signup btn-gray"
                    // onClick={onClick} disabled={!(user.id && user.password && isPassword)}
                >
                    {type === 'SignUp' ? '가입하기' : '로그인'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;