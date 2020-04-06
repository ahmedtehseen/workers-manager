import React, { useState } from "react";
import MomentUtils from "@date-io/moment";
import "./DatePicker.css";

import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import img from "./../../images/chevron-right-solid.svg";

function DatePickerComponent(props) {
  const [date, setDate] = useState(new Date());
  const injectTheme = () => {
    let node = document.getElementById("date-picker-arrow").parentNode
      .parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
      .parentElement;
    node.classList.add("calender");
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="pickers" style={{ marginTop: "9.5px" }}>
          <DatePicker
            value={date}
            leftArrowIcon={
              <img
                src={img}
                alt="img"
                id="date-picker-arrow"
                onLoad={() => injectTheme()}
                style={{ height: "17px", transform: "rotate(180deg)" }}
              />
            }
            rightArrowIcon={
              <img
                src={img}
                alt="img"
                id="date-picker-arrow"
                style={{ height: "17px" }}
              />
            }
            onChange={(value) => {
              setDate(value);
              props.setFieldValue("dateOfSubmission", value);
            }}
          />
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default DatePickerComponent;
