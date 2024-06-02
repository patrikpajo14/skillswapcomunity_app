import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const WidgetWithGraph = ({ title, doneNumber, totalNumber }) => {
  const done = (doneNumber * 100) / totalNumber;
  const rest = 100 - done;

  const data = {
    labels: ["Done", "Pending"],
    datasets: [
      {
        label: "%",
        data: [done, rest],
        backgroundColor: ["#8079C6", "#EBE9FF"],
        borderColor: ["#8079C6", "#EBE9FF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card">
      <div className="flex gap-2">
        <div className="flex-1 flex flex-col justify-between py-4 pl-4">
          <h2 className="text-base md:text-xs lg:text-base">{title}</h2>
          <div>
            <p className="text-xs text-gray-400">Done</p>
            <p className="text-xl md:text-lg lg:text-xl font-bold">
              {doneNumber} <span className="font-normal text-sm">of</span>{" "}
              {totalNumber}
            </p>
          </div>
        </div>
        <div className="flex-1 max-w-[140px] p-4">
          <Doughnut data={data} />
        </div>
      </div>
    </div>
  );
};

export default WidgetWithGraph;
