import React, { useReducer, useState, useEffect } from "react";
import { Actions, ALGORITHMS, FIELDS } from "../VisualizerEnums";

interface BarProps {
  arrayData: any[];
  barColor: string;
  maxArraySize: number;
}

const Bars: React.FC<BarProps> = (props) => {
  const max = Math.max(...props.arrayData);
  const length = props.arrayData.length;

  return (
    <React.Fragment>
      {props.arrayData.map((data, i) => {
        const heightValue = (100 / max) * data;
        return (
          <div
            key={i}
            className="bar"
            id={`val-${data}`}
            style={{
              backgroundColor: props.barColor,
              height: `${heightValue}%`,
              width: `${props.maxArraySize / length}px`,
            }}
          >
            {/* {data} */}
          </div>
        );
      })}
    </React.Fragment>
  );
};
export default Bars;
