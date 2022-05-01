import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const styles = {
  margin: '0',
  position: "relative",
  bottom: "50px",
  right: "300px",
}

export default function LineGraph(props) {
  return (
    <LineChart
      style={styles}
      width={1000}
      height={300}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={props.xkey} />
      <YAxis dataKey={props.ykey} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey={props.linekey}
        xAxis={props.xkey}
        yAxis={props.ykey}
        stroke="#8884d8"
        dot={{ r: 0}}
        activeDot={{ r: 10, strokeWidth: 2 }}
      />
    </LineChart>
  );
}
