import HeaderAmount from '../../common/header/header_amount'
import { useState, useEffect } from "react"
import { addComma } from '../../../utils/numberUtils'
import Nav from '../../common/nav/nav'
import './daily.scss'
import axios from 'axios'
import HeaderTitle from '../../common/header/header_title'
import { url } from '../../common/api'

const Daily = () => {
    const [financialList, setFinancialList] = useState()
    const [totalSum, setTotalSum ] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalOutcome, setTotalOutcome] = useState(0)
    const total = { sum: 0, income: 0, outcome: 0 }
    
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
            <Nav />
            <div className="daily">
                <HeaderAmount income={totalIncome.toString()} outcome={totalOutcome.toString()} sum={totalSum.toString()} />
                <div className="daily_content_container">
                    <div className='item_name_container'>
                        <p className='use_date'>사용 날짜</p>
                        <p className='use_item_title'>사용 내역</p>
                        <p className='use_income_amount'>수입 금액</p>
                        <p className='use_outcome_amount'>지출 금액</p>
                    </div>
                    <hr className='devideLine'/>
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
                                    <p className="date">{content.USE_DATE}</p>
                                    <p className="item_title">{content.TITLE}</p>
                                    <p className="income">+{content.IO_TYPE === 'I' ? addComma(content.AMOUNT) : 0}원</p>
                                    <p className="outcome">-{content.IO_TYPE === 'O' ? addComma(content.AMOUNT) : 0}원</p>
                                    <hr/>
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