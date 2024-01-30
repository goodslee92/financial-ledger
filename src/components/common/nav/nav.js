import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

function Nav() {
    const buttonList = [
        { text: "내역 추가", path: "/Home" },
        { text: "달력", path: "/Calendar" },
        { text: "일일", path: "/Daily" },
        { text: "통계", path: "/Statistics" },
      ];
    const [selected, setSelected] = useState();
    const buttonHandler = (text) => {
        setSelected(text);
    };
    const classes = useStyles();
    return (
        <div>
            <div className="navbar">
                {
                    buttonList.map((item, index) => {
                        return (
                            <Link className={item.text === selected ? classes.underLine : classes.underLine_none}
                                to={item.path}
                                key={index}
                                onClick={() => {
                                    buttonHandler(item.text);
                                }}
                            >
                                { item.text }
                            </Link>
                        )
                    })
                }
                {/* <Link className="navbarMenu" to={'/Home'}>내역 추가</Link>
                <Link className="navbarMenu" to={'/Calendar'}>달력</Link>
                <Link className="navbarMenu" to={'/Daily'}>일일</Link>
                <Link className="navbarMenu" to={'/Statistics'}>통계</Link> */}
            </div>
        </div>
    );
}
const useStyles = makeStyles({
    // 밑줄 비표시
    underLine_none: {
        color: "black",
        width: "20%",
        textDecoration: "none",
      },
    // 버튼 선택시 빨간 밑줄 표시
    underLine: {
        color: "black",
        width: "20%",
        textDecoration: "underline",
        textDecorationColor: "#ff5b5b",
        textDecorationThickness: "5px",
        fontWeight: "bold"
    },
});

export default Nav;