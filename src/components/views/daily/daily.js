import Header from '../../common/header/header';
import { useState, useEffect } from "react";
import { addComma } from '../../../utils/numberUtils';
import './daily.scss';
import axios from 'axios';

const Daily = () => {
    const [financialList, setFinancialList] = useState();
    
    useEffect(() => {
        // fetch('http://localhost:3001/api/moneyTblInfo')
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        //     setFinancialList(data);
        // }, []);
        axios.get('http://localhost:3001/api/moneyTblInfo')
        .then(res => {
            console.log(res.data);
            setFinancialList(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    // const data = JSON.stringify(financialList);
    return (
        <div className="daily">
            <Header />
            <div className="content_container">
                {
                    financialList && financialList.map((content, index) => {
                        return (
                            <div className="row_container" key={index}>
                                <p className="date">{content.USE_DATE}</p>
                                <p className="income">{content.IO_TYPE == 'I' ? addComma(content.AMOUNT) : 0}원</p>
                                <p className="outcome">{content.IO_TYPE == 'O' ? addComma(content.AMOUNT) : 0}원</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Daily