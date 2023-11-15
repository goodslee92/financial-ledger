import { addComma } from '../../../utils/numberUtils';

const Header = (props) => {
    return (
        <header className="header">
            <div className="incomeTitle">
                <span>수입</span> 
                <strong className="incomeValue">
                    {addComma(props.income)}원
                </strong>
            </div>
            <div className="expenseTitle">
                <span>지출</span>
                <strong className="expenseValue">
                    {addComma(props.outcome)}원
                </strong>
            </div>
            <div className="totalTitle">
                <span>합계</span>
                <strong className="totalValue">
                    {addComma(props.sum)}원
                </strong>
            </div>
        </header>
    )
}

export default Header