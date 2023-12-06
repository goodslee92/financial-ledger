import Header from '../../common/header/header'
import { useState, useEffect } from "react"
import { addComma } from '../../../utils/numberUtils'
import Nav from '../../common/nav/nav'
import './daily.scss'
import axios from 'axios'

let total = { sum: 0, income: 0, outcome: 0}

const Daily = () => {
    const [financialList, setFinancialList] = useState()
    const [totalSum, setTotalSum ] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalOutcome, setTotalOutcome] = useState(0)
    const total = { sum: 0, income: 0, outcome: 0 }
    
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('http://localhost:3001/api/moneyTblInfo')
            .then(res => {
                console.log(res.data)
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
            <Nav />
            <div className="daily">
                
                <Header income={totalIncome.toString()} outcome={totalOutcome.toString()} sum={totalSum.toString()} />
                <div className="content_container">
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
                                <div className="row_container" key={index}>
                                    <p className="date">{content.USE_DATE}</p>
                                    <p className="income">{content.IO_TYPE === 'I' ? addComma(content.AMOUNT) : 0}원</p>
                                    <p className="outcome">{content.IO_TYPE === 'O' ? addComma(content.AMOUNT) : 0}원</p>
                                </div>
                            )
                        })
                    }
                </div>
                {console.log('totalincome : ' + totalIncome)}
                {console.log('totaloutcome : ' + totalOutcome)}
                {console.log('totalsum : ' + totalSum)}
            </div>
        </div>
    )
}

export default Daily