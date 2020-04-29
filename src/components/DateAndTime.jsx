import React, { Component } from "react";

const DateAndTime = (props) => {
  return (
    <button className="btn btn-primary" type="button">
      {props.dateAndTime.toString()}
    </button>
  );
};

export default DateAndTime;
