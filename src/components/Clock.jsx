import React from "react";

const Clock = (props) => {
  return (
    <span
      className="badge badge-secondary"
      style={{ backgroundColor: "blue", padding: 30 }}
    >
      {props.minCount >= 10 ? props.minCount : "0" + props.minCount}:
      {props.secCount >= 10 ? props.secCount : "0" + props.secCount}
    </span>
  );
};

export default Clock;
