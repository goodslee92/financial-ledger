import React, { useState } from "react";
import Select from "react-select"
import './statistics.scss';
import HeaderAmount from '../../common/header/header_amount';
import { addComma } from '../../../utils/numberUtils';
import Nav from '../../common/nav/nav'
import HeaderTitle from "../../common/header/header_title";

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
    const [dummy, setDummy] = useState([['11.5 ~ 11.11', '12345', '10000'],['11.12 ~ 11.18', '24680', '20000'],['11.19 ~ 11.25', '987654321', '13579123']]);

    return (
        <div className="statistics_root_container">
            <HeaderTitle />
            <Nav />
            <div className="statistics_container">
                <HeaderAmount income={'13579'} outcome={'24680'} sum={'1234567890'}/>
                <div className="dropDown_container">
                    <div className="select_div">
                        <Select defaultValue={options[0]} options={options} className="select" onChange={handleOnChange} />
                    </div>
                </div>
                <div className="statistics_content_container">
                    {
                        dummy.map((content, index) => {
                            return (
                                <div className="row_container" key={index}>
                                    <p className="period">{content[0]}</p>
                                    <p className="income">+{addComma(content[1])}원</p>
                                    <p className="outcome">-{addComma(content[2])}원</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Dropdown