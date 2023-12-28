import { enteredOnlyNumber, addComma, deleteComma } from '../../../utils/numberUtils';
import React, { useCallback, useState } from "react";
import axios from "axios";
import { url } from '../../common/api'

const NewItem = () => {
    // 날짜
    const [enteredDate, setEnteredDate] = useState("");
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };
    const getDate = useCallback(() => {
        return new Date().toISOString().substring(0, 10);
    }, []);
    // 내역
    const item_title_length = 35;
    const [isTitleSizeOver, setIsItemSizeOver] = useState(false);
    const [enteredTitle, setEnteredItem] = useState("");
    const itemChangeHandler = (event) => {
        let isSizeOver = event.target.value.length > item_title_length ? true : false;
        setIsItemSizeOver(isSizeOver);
    
        setEnteredItem(event.target.value);
      };
    // 금액
    const [enteredAmount, setEnteredAmount] = useState("");
    // const [isEnteredWrongAmount, setIsEnteredWrongAmount] = useState(false);
    const amountChangeHandler = (event) => {
        let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value)
            ? true
            : false;
        // setIsEnteredWrongAmount(isNotNumber);
        if (isNotNumber) return;

        let amount = addComma(enteredOnlyNumber(event.target.value));
        setEnteredAmount(amount);
    };
    // 구분(수입, 지출)
    const [entredIoType, setEnteredIoType] = useState("I");
    const ioTypeChangeHandler = (event) => {
        setEnteredIoType(event.target.value);
    };
    
    const data = {
        user_id: window.sessionStorage.getItem('loginUserId'),
        amount: deleteComma(enteredAmount),
        use_date: enteredDate,
        title: enteredTitle,
        io_type: entredIoType,
    }
    const registerNewItemHandler = () => {
        // console.log(
        //     "user_id: " + window.sessionStorage.getItem('loginUserId') + 
        //     ", amount: " + enteredAmount + ", use_date: " + enteredDate
        //     + ", title: " + enteredTitle + ", io_type: " + entredIoType)
        const fetchData = async () => {
            await axios.post(url + '/api/addNewItem', data)
                .then(res => {
                    // console.log(res.data)
                    if (res.status === 200) {
                        alert("내역이 추가 되었습니다.");
                        clearItem();
                    } else {
                        alert("내역 추가를 실패했습니다.");
                    }
                }).catch(err => {
                    console.log(err)
                    alert("내역 추가를 실패했습니다.");
                })
        }
        fetchData();
    }
    const clearItem = () => {
        // 입력창 초기화
        setEnteredDate("");
        setEnteredItem("");
        setEnteredAmount("");
        setEnteredIoType("income");
    }
    const cancleHandler = () => {
        clearItem()
    }
    return (
        <div className="new-item">
            <h1 className="fs-normal">내역 추가</h1>
            <div className="new-item-form-info">
                <h2 className="fs-normal fw-regular">날짜</h2>
                <input type="date" value={enteredDate} onChange={dateChangeHandler} min="2020-01-01" max={getDate()} required />
            </div>

            <div className="new-item-form-info">
                <h2 className="fs-normal fw-regular">내역</h2>
                <span
                    className="fs-tiny ft-alert"
                    style={{ display: isTitleSizeOver ? "inline-block" : "none" }}
                >
                    {item_title_length}자까지만 입력할 수 있어요.
                </span>
                <input type="text" value={enteredTitle} onChange={itemChangeHandler} placeholder="사용 내역을 입력해주세요." maxLength={item_title_length} required />
            </div>

            <div className="new-item-form-info">
                <h2 className="fs-normal fw-regular">금액</h2>
                <input type="text" value={enteredAmount} onChange={amountChangeHandler} placeholder="금액을 입력해주세요." maxLength="11" required />
            </div>

            <div className="amount_type">
                <div className="amount_income">
                    <input 
                        type="radio" id="income" name="amount_type_income" value="I" onChange={ioTypeChangeHandler}
                        checked={entredIoType === "I" || ""}
                    />
                    <label htmlFor="income" className="fs-small">수입</label>
                </div>

                <div className="amount_outcome">
                    <input 
                        type="radio" id="outcome" name="amount_type_outcome" value="O" onChange={ioTypeChangeHandler}
                        checked={entredIoType === "O" || ""}
                    />
                    <label htmlFor="outcome" className="fs-small">지출</label>
                </div>
            </div>

            <div className="new-item_form-actions">
                <button className="btn-blue btn-register" onClick={registerNewItemHandler}>등록</button>
                <button className="btn-white btn-cancle" onClick={cancleHandler}>취소</button>
            </div>
        </div>
    )
}

export default NewItem 