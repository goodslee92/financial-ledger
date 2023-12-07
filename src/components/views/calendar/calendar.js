import { useState } from 'react';
import { subMonths, addMonths } from 'date-fns';
import CalendarHeader from './calendarHeader';
import CalendarDays from './calendarDays';
import CalendarCells from './calendarCells';
import HeaderAmount from '../../common/header/header_amount';
import Nav from '../../common/nav/nav'
import HeaderTitle from '../../common/header/header_title';

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
    return (
        <div className="calendar">
            <HeaderTitle />
            <Nav />
            <HeaderAmount income={'13579'} outcome={'24680'} sum={'1234567890'}/>
            <CalendarHeader currentMonth={currentMonth} prevMonth={() => prevMonth()} nextMonth={() => nextMonth()} />
            <CalendarDays />
            <CalendarCells currentMonth={currentMonth} selectedDate={selectedDate} onDateClick={() => onDateClick()} />
        </div>
    );
}

export default Calendar