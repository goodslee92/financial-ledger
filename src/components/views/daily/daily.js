import HeaderAmount from '../../common/header/header_amount'
import { useState, useEffect } from "react"
import { addComma } from '../../../utils/numberUtils'
import Nav from '../../common/nav/nav'
import './daily.scss'
import axios from 'axios'
import HeaderTitle from '../../common/header/header_title'
import { url } from '../../common/api'
import { subMonths, addMonths, format } from 'date-fns';
import CalendarHeader from '../calendar/calendarHeader';
import RoundBtn from '../../common/roundBtn/roundBtn'

const Daily = () => {
    const [financialList, setFinancialList] = useState()
    const [totalSum, setTotalSum ] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalOutcome, setTotalOutcome] = useState(0)
    const total = { sum: 0, income: 0, outcome: 0 }
    
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
        console.log("prevMonth called.. currentMonth : " + format(currentMonth, 'MM'));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
        console.log("nextMonth called.. currentMonth : " + format(currentMonth, 'MM'));
    };

    const data = {
        id: window.sessionStorage.getItem('loginUserId'),
        currentMonth: format(currentMonth, 'MM'),
        currentYear: format(currentMonth, 'yyyy')
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
        
    }, [currentMonth])

    useEffect(() => {
        setTotalIncome(total.income)
        setTotalOutcome(total.outcome)
        setTotalSum(total.sum)
    }, [financialList])

    return (
        <div className='daily_root_container'>
            <HeaderTitle />
            <HeaderAmount income={totalIncome.toString()} outcome={totalOutcome.toString()} sum={totalSum.toString()} />
            <CalendarHeader currentMonth={currentMonth} prevMonth={() => prevMonth()} nextMonth={() => nextMonth()} />
            <Nav />
            <div className="daily">
                <div className="daily_content_container">
                    <div className='daily_item_name_container'>
                        <p className='daily_item_use_date'>사용일</p>
                        <p className='daily_item_use_item_title'>사용 내역</p>
                        <p className='daily_item_use_income_amount'>수입 금액</p>
                        <p className='daily_item_use_outcome_amount'>지출 금액</p>
                    </div>
                    <hr className='daily_devideLine'/>
                    {
                        financialList ? (
                            financialList.length > 0 ? (
                                financialList.map((content, index) => {
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
                            ) : (
                                <p>표시할 내역이 없습니다.</p>
                            )
                        ) : (
                            <p>데이터를 불러오는 중입니다...</p>
                        )
                    }
                </div>
            </div>
            <RoundBtn />
        </div>
    )
}

export default Daily