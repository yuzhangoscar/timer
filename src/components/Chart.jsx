import React, { useState, useEffect } from "react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend } from "recharts";

const Chart = ({ round, dateAndTime }) => {
  const [data, setData] = useState([]);
  const localeDate = dateAndTime.toLocaleDateString();

  useEffect(() => {
    if (data.length === 0) {
      setData([
        ...data,
        {
          round: round,
          date: localeDate,
        },
      ]);
    } else {
      //update item if date.getMinutes() matches
      if (data[data.length - 1].date === localeDate) {
        let newData = data.map((item) => {
          let newItem =
            item.date === localeDate ? { ...item, round: round } : item;
          return newItem;
        });
        setData(newData);
      } else {
        setData([...data, { round: round, date: localeDate }]);
      }
    }
  }, [round]);

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
