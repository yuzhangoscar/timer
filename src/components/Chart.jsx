import React, { useState, useEffect } from "react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend } from "recharts";

const Chart = ({ round, dateAndTime, resetCurrent }) => {
  const [data, setData] = useState([]);
  const localeDate = dateAndTime.toLocaleDateString();
  const numberOfRecords = 13;

  useEffect(() => {
    let arrayLength = data.length;
    const arrayFull = arrayLength > numberOfRecords;
    const updateDataArray =
      arrayLength !== 0 && data[arrayLength - 1].date === localeDate;
    let newData = data.concat();

    if (updateDataArray) {
      newData.pop();
    } else if (arrayFull) {
      newData.shift();
    }
    newData.push({ round: round, date: localeDate });
    setData(newData);
  }, [round]);

  useEffect(() => {
    resetCurrent();
  }, [localeDate]);

  return (
    <BarChart width={1430} height={650} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="round" fill="#8884d8" />
    </BarChart>
  );
};

export default Chart;
