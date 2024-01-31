import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

function Nav() {
    const buttonList = [
        { text: "내역 추가", path: "/Home" },
        { text: "달력", path: "/Calendar" },
        { text: "일일", path: "/Daily" },
        { text: "통계", path: "/Statistics" }
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
        color: "red",
        width: "20%",
        textDecoration: "underline",
        textDecorationColor: "#ff5b5b",
        textDecorationThickness: "3px",
        fontWeight: "bold"
    },
});

export default Nav;