import React, { useEffect, useState } from "react";
import Clock from "./components/Clock";
import Buttons from "./components/Buttons";
import Chart from "./components/Chart";
import DateAndTime from "./components/DateAndTime";

const App = () => {
  const oneSec = 1000;
  const sessionInMin = 45;
  const [secCount, setSecCount] = useState(0);
  const [minCount, setMinCount] = useState(sessionInMin);
  const [intervalEnabled, setInterv] = useState(true);
  const [round, setRound] = useState(0);
  const [date, setDate] = useState(new Date());
  const [totalRound, setTotalRound] = useState(0);

  useEffect(() => {
    if (totalRound === 0) {
      setTotalRound(0);
    } else setTotalRound(totalRound + 1);
  }, [round]);

  useEffect(() => {
    let timer;
    if (intervalEnabled) {
      if (secCount > 0) {
        timer = setInterval(() => {
          setSecCount(secCount - 1);
        }, oneSec);
      }
      if (secCount === 0 && minCount > 0) {
        timer = setInterval(() => {
          setSecCount(59);
        }, oneSec);
      }
    }
    return () => clearInterval(timer);
  }, [secCount, intervalEnabled]);

  useEffect(() => {
    if (secCount === 0 && minCount > 0) {
      setMinCount(minCount - 1);
    }
  }, [secCount]);

  useEffect(() => {
    if (minCount === 0 && secCount === 0) {
      if (round < 4) {
        setRound(round + 1);
      } else setRound(0);

      reset();
    }
  }, [minCount, secCount]);

  useEffect(() => {
    setDate(new Date());
  }, [secCount]);

  const reset = () => {
    setMinCount(sessionInMin);
    setSecCount(0);
  };

  const stop = () => {
    setInterv(false);
  };

  const resume = () => {
    setInterv(true);
  };

  return (
    <React.Fragment>
      <h1>
        <Clock secCount={secCount} minCount={minCount}></Clock>
        <Buttons
          onClickStop={stop}
          onClickResume={resume}
          onClickSkip={reset}
        ></Buttons>
        <span className="badge">current: {round}</span>
        <span className="badge">total: {totalRound}</span>
        <Chart round={round} dateAndTime={date}></Chart>
      </h1>
      <DateAndTime dateAndTime={date} />
    </React.Fragment>
  );
};

export default App;
