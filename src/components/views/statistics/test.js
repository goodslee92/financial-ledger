import React, { useState } from "react"
import Select from "react-select"
import './test.scss';

const Test = () => {
  const options = [
    { value: "주간", label: "주간" },
    { value: "월간", label: "월간" },
    { value: "연간", label: "연간" },
  ]
  return (
    <div>
      <Select options={options} className="select"/>
    </div>
  )
}

export default Test