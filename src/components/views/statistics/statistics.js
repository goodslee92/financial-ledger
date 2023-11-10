import React, { useState, useEffect } from "react";
import Select from "react-select"
import './statistics.scss';
import Header from '../../common/header/header';
import { addComma } from '../../../utils/numberUtils';

const Dropdown = () => {
    const options = [
        { value: "주간", label: "주간" },
        { value: "월간", label: "월간" },
        { value: "연간", label: "연간" }
    ]
    const [selectedValue, setSelectedValue] = useState(null);
    const handleOnChange = (e) => {
        setSelectedValue(e.value);
    }
    const [dummy, setDummy] = useState([['11.5 ~ 11.11', '+12345', '-10000'],['11.12 ~ 11.18', '+24680', '-20000'],['11.19 ~ 11.25', '+987654321', '-13579123']]);

    return (
        <div className="statistics_container">
            <Header />
            <div className="dropDown_container">
                <div className="select_div">
                    <Select defaultValue={options[0]} options={options} className="select" onChange={handleOnChange} />
                </div>
            </div>
            <div className="content_container">
                {
                    dummy.map((content, index) => {
                        return (
                            <div className="row_container" key={index}>
                                <p className="period">{content[0]}</p>
                                <p className="income">{addComma(content[1])}원</p>
                                <p className="outcome">{addComma(content[2])}원</p>
                            </div>
                        )
                    })
                }
                {useGet()}
            </div>
        </div>
    );
}

function useGet() {
    useEffect(() => {
        getTblInfo()
    })
}

async function getTblInfo() {
    const res = await fetch("http://localhost:3001/api/moneyTblInfo", {
        method: 'get',
        headers: {
            'Content-type' : 'application/json',
        }
    });
    if (res.ok) {
        // 성공
        const data = res.json();
        console.log(data);
        return data;
    } else {
        // 실패
        console.error('실패');
    }
}

export default Dropdown