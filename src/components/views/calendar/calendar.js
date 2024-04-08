import { useState, useEffect } from 'react';
import { subMonths, addMonths, format } from 'date-fns';
import CalendarHeader from './calendarHeader';
import CalendarDays from './calendarDays';
import CalendarCells from './calendarCells';
import HeaderAmount from '../../common/header/header_amount';
import Nav from '../../common/nav/nav'
import HeaderTitle from '../../common/header/header_title';
import './calendar.scss';
import RoundBtn from '../../common/roundBtn/roundBtn';
import axios from 'axios'
import { url } from '../../common/api'

export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };
    const [totalSum, setTotalSum ] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalOutcome, setTotalOutcome] = useState(0)
    const total = { sum: 0, income: 0, outcome: 0 }
    const data = {
        id: window.sessionStorage.getItem('loginUserId'),
        currentMonth: format(currentMonth, 'MM'),
        currentYear: format(currentMonth, 'yyyy')
    }
    const [financialList, setFinancialList] = useState()
    useEffect(() => {
        const fetchData = async () => {
            await axios.post(url + '/api/moneyTblInfo', data)
            .then(res => {
                console.log('moneyTblInfo api return : ' + res.data)
                setFinancialList(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
        fetchData()
        
    }, [currentMonth])

    useEffect(() => {
        if (financialList) {
            financialList.forEach((content) => {
                if (content.IO_TYPE === 'I') {
                    total.sum += +content.AMOUNT;
                    total.income += +content.AMOUNT;
                } else {
                    total.sum -= +content.AMOUNT;
                    total.outcome += +content.AMOUNT;
                }
            });
            setTotalIncome(total.income)
            setTotalOutcome(total.outcome)
            setTotalSum(total.sum)
        }
    }, [financialList])
    
    return (
        <div className="calendar">
            <HeaderTitle />
            <Nav />
            <HeaderAmount income={totalIncome.toString()} outcome={totalOutcome.toString()} sum={totalSum.toString()} />
            <CalendarHeader currentMonth={currentMonth} prevMonth={() => prevMonth()} nextMonth={() => nextMonth()} />
            <CalendarDays />
            <CalendarCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={() => onDateClick()} financialList={financialList} />
            <RoundBtn />
        </div>
    );
}

export default Calendar