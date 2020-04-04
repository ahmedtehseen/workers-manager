import React, { useState } from "react";
import MomentUtils from "@date-io/moment";
import "./DatePicker.css";

import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import img from "./../../images/chevron-right-solid.svg";

function DatePickerComponent({ setFieldValue, name, value }) {
  const injectTheme = () => {
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
            // value={value}
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
              console.log(value);
              setFieldValue("dateOfSubmission", value._i);
            }}
            // name={name}
          />
        </div>
      </MuiPickersUtilsProvider>
    </>
  );
}

export default DatePickerComponent;
