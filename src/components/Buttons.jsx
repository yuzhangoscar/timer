import React from "react";

const Buttons = (props) => {
  return (
    <React.Fragment>
      <button className="btn btn-danger" onClick={props.onClickStop}>
        STOP
      </button>
      <button className="btn btn-success" onClick={props.onClickResume}>
        RESUME
      </button>
      <button className="btn btn-success" onClick={props.onClickSkip}>
        SKIP
      </button>
    </React.Fragment>
  );
};

export default Buttons;
