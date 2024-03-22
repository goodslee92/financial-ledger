// ID 4글자 이상 12글자 이하 체크
export const idLength = (id) => {
    return id.length >= 4 && id.length <= 12
};

// ID 영어 또는 숫자만 사용 체크
export const idNumberAndEnglish = (id) => {
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(id);
};

// PW 8~16자 영문, 숫자, 특수 문자 사용 체크
export const pwValidationCheck = (pw) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(pw);
};

