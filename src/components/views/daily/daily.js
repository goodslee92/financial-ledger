import HeaderAmount from '../../common/header/header_amount'
import { useState, useEffect } from "react"
import { addComma } from '../../../utils/numberUtils'
import Nav from '../../common/nav/nav'
import './daily.scss'
import axios from 'axios'
import HeaderTitle from '../../common/header/header_title'
import { url } from '../../common/api'
import { subMonths, addMonths } from 'date-fns';
import CalendarHeader from '../calendar/calendarHeader';

const Daily = () => {
    const [financialList, setFinancialList] = useState()
    const [totalSum, setTotalSum ] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalOutcome, setTotalOutcome] = useState(0)
    const total = { sum: 0, income: 0, outcome: 0 }
    
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const data = {
        id: window.sessionStorage.getItem('loginUserId')
    }
    useEffect(() => {
        const fetchData = async () => {
            await axios.post(url + '/api/moneyTblInfo', data)
            .then(res => {
                // console.log(res.data)
                setFinancialList(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
        fetchData()
        
    }, [])

    useEffect(() => {
        setTotalIncome(total.income)
        setTotalOutcome(total.outcome)
        setTotalSum(total.sum)
    }, [financialList])

    return (
        <div className='daily_root_container'>
            <HeaderTitle />
            <CalendarHeader currentMonth={currentMonth} prevMonth={() => prevMonth()} nextMonth={() => nextMonth()} />
            <Nav />
            <div className="daily">
                <HeaderAmount income={totalIncome.toString()} outcome={totalOutcome.toString()} sum={totalSum.toString()} />
                <div className="daily_content_container">
                    <div className='daily_item_name_container'>
                        <p className='daily_item_use_date'>사용일</p>
                        <p className='daily_item_use_item_title'>사용 내역</p>
                        <p className='daily_item_use_income_amount'>수입 금액</p>
                        <p className='daily_item_use_outcome_amount'>지출 금액</p>
                    </div>
                    <hr className='daily_devideLine'/>
                    {
                        financialList && financialList.map((content, index) => {
                            if (content.IO_TYPE === 'I') {
                                total.sum += +content.AMOUNT
                                total.income += +content.AMOUNT
                            } else {
                                total.sum -= +content.AMOUNT
                                total.outcome += +content.AMOUNT
                            }
                            return (
                                <div className="row_daily_item_container" key={index}>
                                    <p className="daily_item_date">{content.USE_DATE}</p>
                                    <p className="daily_item_title">{content.TITLE}</p>
                                    <p className="daily_item_income">+{content.IO_TYPE === 'I' ? addComma(content.AMOUNT) : 0}원</p>
                                    <p className="daily_item_outcome">-{content.IO_TYPE === 'O' ? addComma(content.AMOUNT) : 0}원</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Daily