import React, { useState } from "react";
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
    const [dummy, setDummy] = useState([['11.5 ~ 11.11', '+12345', '-10000'],['11.12 ~ 11.18', '+24680', '-20000'],['11.19 ~ 11.25', '+987654321', '-13579123']]);

    return (
        <div className="statistics_container">
            <Header />
            <div className="dropDown_container">
                <div className="select_div">
                    <Select options={options} className="select"/>
                </div>
            </div>
            <div className="content_container">
                {
                    dummy.map(function(content) {
                        return (
                            <div className="row_container">
                                <p className="period">{content[0]}</p>
                                <p className="income">{addComma(content[1])}원</p>
                                <p className="outcome">{addComma(content[2])}원</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Dropdown