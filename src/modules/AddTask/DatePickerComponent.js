import React, { useState } from "react";
import MomentUtils from "@date-io/moment";
import "./DatePicker.css";

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "material-ui-pickers";
import img from "./../../images/chevron-right-solid.svg";

function DatePickerComponent() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const injectTheme = () => {
    console.log("added");
    let node = document.getElementById("date-picker-arrow").parentNode
      .parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
      .parentElement;
    node.classList.add("calender");
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="pickers">
          <DatePicker
            value={selectedDate}
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
          />
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default DatePickerComponent;
