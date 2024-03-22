import React, {useState} from 'react';
import './signup.scss';
import axios from "axios";
import { useNavigate } from "react-router-native";
import { url } from '../../common/api'
import { IoIosCheckmarkCircleOutline, IoIosCheckmark } from "react-icons/io";
import { isNullOrEmpty } from '../../../utils/stringUtils';
import { idLength, idNumberAndEnglish, pwValidationCheck } from '../../../utils/validationCheckUtils';
import { TiArrowBackOutline } from "react-icons/ti";
import { MdOutlineCreate } from "react-icons/md";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };
    const [id, setId] = useState('');
    const idChangeHandler = (event) => {
        setId(event.target.value);
        setIdDuplicateCheck(false)
    };
    const [password, setPassword] = useState('');
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };
    const [passwordCheck, setPasswordCheck] = useState('');
    const passwordCheckChangeHandler = (event) => {
        setPasswordCheck(event.target.value);
    };
    const [isPasswordSame, setIsPasswordSame] = useState(false);
    const data = {
        id : id,
        password : password,
        name : name,
    };
    const signUpClickHandler = () => {
        if (password === passwordCheck) {
            const fetchData = async () => {
                await axios.post(url + '/api/registerAccount', data)
                    .then(res => {
                        // console.log(res.data)
                    }).catch(err => {
                        console.log(err)
                    })
            }
            fetchData();
            setIsPasswordSame(true)
            alert(data.name + "님의 가입을 환영합니다.");
            navigate('/');
        } else {
            alert('비밀번호가 일치하지 않습니다.')
            setIsPasswordSame(false)
        }

    }
    const [idDuplicateCheck, setIdDuplicateCheck] = useState(false);
    const checkIdHandler = () => {
        const fetchData = async () => {
            await axios.post(url + '/api/checkId', data)
                .then(res => {
                    // console.log(res.data)
                    if (res.data[0] === undefined) {
                        alert('사용 가능한 ID입니다')
                        setIdDuplicateCheck(true)
                    } else {
                        alert('이미 존재하는 ID입니다')
                        setIdDuplicateCheck(false)
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
        fetchData();
    }
    const backHandler = () => {
        navigate('/');
    }
    return (
        <div className='signup_root_container'>
            <div>
                <h1>회원가입</h1>
            </div>
            <div className='inputList'>
                <input className='name' name='name' type="name" placeholder='이름' onChange={nameChangeHandler} />
                <div className='su_id_container'>
                    <input className='su_id' name='id' type="id" placeholder='아이디' onChange={idChangeHandler} />
                    
                    { isNullOrEmpty(id) && idLength(id) && idNumberAndEnglish(id) && idDuplicateCheck && 
                        <IoIosCheckmarkCircleOutline className='id_validation_check'/>
                    }
                    <button className='btn_checkId' onClick={checkIdHandler}><IoIosCheckmark className='duplicate_check_icon'/>중복 확인</button>
                </div>
                {
                    !isNullOrEmpty(id) && !idLength(id) &&
                    <span className='id_length_check'>ID는 4~12자의 영문과 숫자만 사용 가능합니다..</span>
                }
                <input className='su_password' name='password' type="password" placeholder='비밀번호' onChange={passwordChangeHandler} />
                {
                    !isNullOrEmpty(password) && !pwValidationCheck(password) &&
                    <span className='pw_length_num_eng_check'>비밀번호는 8~16자의 영문, 숫자, 특수문자만만 사용가능합니다.</span>
                }
                {
                    isNullOrEmpty(password) && pwValidationCheck(password) &&
                    <IoIosCheckmarkCircleOutline className='pw_validation_check'/>
                }
                <input className='su_passwordCheck' name='passwordCheck' type="password" placeholder='비밀번호 확인' onChange={passwordCheckChangeHandler} />
                {
                    (password !== '' && passwordCheck !== '' && !isPasswordSame) &&
                    <span className='su_password_check_msg'>비밀번호가 일치하지 않습니다.</span>
                }
                <div className='btn_container'>
                    <button className="btn-signup" onClick={signUpClickHandler} 
                        disabled={(isNullOrEmpty(name) || isNullOrEmpty(id) || isNullOrEmpty(password) || isNullOrEmpty(passwordCheck))}>
                            <MdOutlineCreate />
                        가입하기
                    </button>
                    <button className="btn-back" onClick={backHandler} >
                        <TiArrowBackOutline />
                        뒤로가기    
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;