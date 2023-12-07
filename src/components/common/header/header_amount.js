import { addComma } from '../../../utils/numberUtils';

const HeaderAmount = (props) => {
    return (
        <header className="header_amount">
            <div className="incomeTitle">
                <span>수입</span> 
                <strong className="incomeValue">
                    {addComma(props.income)}원
                </strong>
            </div>
            <div className="outcomeTitle">
                <span>지출</span>
                <strong className="outcomeValue">
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

export default HeaderAmount