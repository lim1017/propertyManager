import React, { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Cell, Tooltip } from "recharts";

export default function PieChartz({ collectedRent, totalPossibleRent }) {
  let collectedRentz = (collectedRent / totalPossibleRent)
  let uncollectedRent = (1 - collectedRentz)

  const COLORS = ["#289940", "#991828"];


  const data01 = [
    {
      name: "% of Total Rent Collected",
      value: collectedRentz,
    },
    {
      name: "% of Uncollected Rent",
      value: uncollectedRent
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PieChart width={300} height={250}>
        <Tooltip
          itemStyle={{ color: "#e7e7e7" }}
          contentStyle={{ backgroundColor: "#272727" }}
        />

        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
        >
          {data01.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Legend verticalAlign="bottom" height={65} width={250} />
      </PieChart>
    </div>
  );
}
