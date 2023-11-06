import React, { useState } from "react";
import Select from "react-select"
import './statistics.scss';

const Dropdown = () => {
    const options = [
        { value: "주간", label: "주간" },
        { value: "월간", label: "월간" },
        { value: "연간", label: "연간" },
    ]
    return (
        <div className="statistics_container">
            <div className="dropDown_container">
                <div className="period_div">
                    <h1 className="periodTitle">기간</h1>
                </div>
                <Select options={options} className="select"/>
            </div>  
        </div>
    );
}

export default Dropdown