import React, { useState } from "react";

const Statistics = () => {
    const [isDropdownView, setDropdownView] = useState(false)

    const handleClickContainer = () => {
      setDropdownView(!isDropdownView)
    }
  
    const handleBlurContainer = () => {
      setTimeout(() => {
        setDropdownView(false)
      }, 200);
    }
    return (
        <div className="statistics_container" onBlur={handleBlurContainer}>
            <div className="dropDownArea">
                <h3 className="period">기간</h3>
                <label className="periodDropDown" onClick={handleClickContainer}>
                    <button>선택하세요{isDropdownView ? '▲' : '▼'}</button>
                </label>
                {isDropdownView &&
                    <>
                        <li>주간</li>
                        <li>월간</li>
                        <li>연간</li>
                    </>
                }
            </div>
        </div>
    )
}

export default Statistics