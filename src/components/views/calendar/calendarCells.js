import React from 'react';
import { format } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

const CalendarCells = ({ currentMonth, selectedDate, onDateClick, financialList }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    let groupedFinancialEntries = [];
    // 배열이 아니면 예외 처리.
    if (Array.isArray(financialList)) {
        // 수입 및 지출 내역을 날짜별로 그룹화
        groupedFinancialEntries = financialList.reduce((acc, entry) => {
            const date = format(parse(entry.USE_DATE, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd');
            if (!acc[date]) {
                acc[date] = { income: 0, outcome: 0 };
            }
            if (entry.IO_TYPE === 'I') {
                acc[date].income++;
            } else if (entry.IO_TYPE === 'O') {
                acc[date].outcome++;
            }
            return acc;
        }, {});
    } else {
        // TODO 비동기처리 방식 때문인지 최초에 props로 받을때 배열이 안들어옴. 새로 렌더링되면서 제대로 전달됨. 
        // financialList가 배열이 아닌 경우에 대한 처리
        console.log('financialList is not a valid array.');
    }

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const dateKey = format(day, 'yyyy-MM-dd');
            const financialEntries = groupedFinancialEntries[dateKey] || { income: 0, outcome: 0 };

            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(parse(dateKey, 'yyyy-MM-dd', new Date()))}
                >
                    <div>
                        <span
                            className={
                                format(currentMonth, 'M') !== format(day, 'M')
                                    ? 'text not-valid'
                                    : ''
                            }
                        >
                            {formattedDate}
                        </span>
                        <br />
                        <div className="item-count">
                            {financialEntries.income > 0 && (
                                <span className="income-count">+{financialEntries.income}</span>
                            )}
                            <br />
                            {financialEntries.outcome > 0 && (
                                <span className="outcome-count">-{financialEntries.outcome}</span>
                            )}
                        </div>
                    </div>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
}

export default CalendarCells