import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BarChartIcon from '@mui/icons-material/BarChart';

function Nav() {
    const buttonList = [
        { text: "달력", path: "/Calendar", icon: <CalendarTodayIcon /> },
        { text: "일일", path: "/Daily", icon: <DateRangeIcon /> },
        { text: "통계", path: "/Statistics", icon: <BarChartIcon /> }
      ];
    const [selected, setSelected] = useState();
    const buttonHandler = (text) => {
        console.log("buttonHandler called...");
        const asyncSelected = async () => {
            console.log("asyncSelected called... item text : " + text);
            await setSelected(text);
        }
        console.log("asyncSelected before...");
        asyncSelected();
        console.log("asyncSelected end...");
        console.log("selected changed : " + selected);
    };
    const classes = useStyles();
    return (
        <div className="navbar">
            {
                buttonList.map((item, index) => {
                    return (
                        <Link className={`${item.text === selected ? classes.underLine : classes.underLine_none} navbarMenu`}
                            to={item.path}
                            key={index}
                            onClick={() => {
                                buttonHandler(item.text);
                            }}
                        >
                            { item.icon }
                            <br />
                            { item.text }
                        </Link>
                    )
                })
            }
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
        color: "red",
        width: "20%",
        textDecoration: "underline",
        textDecorationColor: "#ff5b5b",
        textDecorationThickness: "3px",
        fontWeight: "bold"
    },
});

export default Nav;