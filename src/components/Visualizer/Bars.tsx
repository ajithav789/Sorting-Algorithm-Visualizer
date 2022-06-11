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
        return (
          <div
            key={i}
            className="bar"
            style={{
              backgroundColor: props.barColor,
              height: `${(100 / max) * data}%`,
              width: `${Math.ceil(props.maxArraySize / length)}px`,
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
