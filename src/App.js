import React, { useEffect, useState } from "react";
import Clock from "./components/Clock";
import Buttons from "./components/Buttons";
import Chart from "./components/Chart";
import DateAndTime from "./components/DateAndTime";

const App = () => {
  const oneSec = 1000;
  const sessionInMin = 45;
  const sessionInSec = 59;
  const [secCount, setSecCount] = useState(0);
  const [minCount, setMinCount] = useState(sessionInMin);
  const [intervalEnabled, setInterv] = useState(true);
  const [round, setRound] = useState(0);
  const [date, setDate] = useState(new Date());
  const [totalRound, setTotalRound] = useState(0);
  const [newDay, setNewday] = useState(true);

  //set TotalRound
  useEffect(() => {
    if (!newDay) {
      setTotalRound(totalRound + 1);
    }
  }, [round]);

  //countdown timer second count
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
          setSecCount(sessionInSec);
          setMinCount(minCount - 1);
        }, oneSec);
      }
    }
    return () => clearInterval(timer);
  }, [secCount, minCount, intervalEnabled]);

  //set round count
  useEffect(() => {
    if (!newDay && minCount === 0 && secCount === 0) {
      if (round < 99) {
        setRound(round + 1);
      } else setRound(0);
      reset();
    }
  }, [minCount, secCount]);

  //set date
  useEffect(() => {
    setDate(new Date());
  }, [secCount]);

  //set newDay flag
  useEffect(() => {
    setNewday(false);
  });

  const resetCurrent = () => {
    setRound(0);
  };

  const reset = () => {
    setMinCount(sessionInMin);
    setSecCount(sessionInSec);
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
        <Chart
          round={round}
          dateAndTime={date}
          resetCurrent={resetCurrent}
        ></Chart>
      </h1>
      <DateAndTime dateAndTime={date} />
    </React.Fragment>
  );
};

export default App;
