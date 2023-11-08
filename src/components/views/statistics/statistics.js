import React from "react";
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
    return (
        <div className="statistics_container">
            <Header />
            <div className="dropDown_container">
                <div className="select_div">
                    <Select options={options} className="select"/>
                </div>
            </div>
            <div className="content_container">
                <div className="row_container">
                    <p className="period">11.5 ~ 11.11</p>
                    <p className="income">{addComma("+5000")}원</p>
                    <p className="outcome">{addComma("-39800")}원</p>
                </div>
                <div className="row_container">
                    <p className="period">11.12 ~ 11.18</p>
                    <p className="income">{addComma("+3980000")}원</p>
                    <p className="outcome">{addComma("-266800")}원</p>
                </div>
                <div className="row_container">
                    <p className="period">11.19 ~ 11.25</p>
                    <p className="income">{addComma("+123456")}원</p>
                    <p className="outcome">{addComma("-15000800")}원</p>
                </div>
            </div>
        </div>
    );
}

export default Dropdown