import { addComma } from '../../../utils/numberUtils';
import React, { useEffect, useState } from "react";

const Header = () => {
    const [totalIncome, setTotalIncome] = useState(+12345);
    const [totalExpense, setTotalExpense] = useState(-24680);
    const [total, setTotal] = useState(totalIncome+totalExpense);

    useEffect(() => {
        let total = { total: 0, income: 0, expense: 0 };
    });
    return (
        <header className="header">
            <div className="incomeTitle">
                <span>수입</span> 
                <strong className="incomeValue">
                    {addComma(totalIncome.toString())}원
                </strong>
            </div>
            <div className="expenseTitle">
                <span>지출</span>
                <strong className="expenseValue">
                    {addComma(totalExpense.toString())}원
                </strong>
            </div>
            <div className="totalTitle">
                <span>합계</span>
                <strong className="totalValue">
                    {addComma(total.toString())}원
                </strong>
            </div>
        </header>
    )
}

export default Header