import React, { useReducer, useState, useEffect } from "react";
import { Actions, ALGORITHMS, FIELDS } from "../VisualizerEnums";
import Bars from "./Bars";

function reducer(state: SettingState, action) {
  switch (action.type) {
    case Actions.FIELDS: {
      return { ...state, [action.field]: action.payload };
    }
  }
}
interface SettingState {
  algorithm_type: string;
  visualization_size: string;
  visualization_speed: string;
  background_color: string;
  bar_color: string;
}

const settingsInitialState: SettingState = {
  algorithm_type: "",
  visualization_size: "",
  visualization_speed: "",
  background_color: "#ffffff",
  bar_color: "#000000",
};

const Visualizer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, settingsInitialState);
  const {
    algorithm_type,
    visualization_size,
    visualization_speed,
    background_color,
    bar_color,
  } = state;

  const [array, setArray] = useState([]);
  const [maxArraySize, setMaxArraySize] = useState(0);
  useEffect(() => {
    const barContainerPixels =
      document.getElementById("bar-container").clientWidth;
    setMaxArraySize(barContainerPixels);
  }, []);
  useEffect(() => {
    const tempArray = [];
    const limit = parseInt(state.visualization_size);
    for (let i = 0; i < limit; i++) {
      tempArray.push(Math.floor(Math.random() * (500 - 5 + 1) + 5));
    }
    setArray(tempArray);
    console.log(tempArray);
  }, [state.visualization_size]);
  return (
    <React.Fragment>
      <div
        className="visualizer container mb-2"
        onClick={() => {
          console.log(state);
        }}
      >
        <div
          className="bar-container"
          id="bar-container"
          style={{ backgroundColor: background_color }}
        >
          <Bars
            arrayData={array}
            barColor={state.bar_color}
            maxArraySize={maxArraySize}
          />
        </div>

        <div className="main-controls flex mt-2 ">
          <div>
            <label htmlFor={FIELDS.ALGORITHM}>Algorithm Type : </label>
            <select
              name={FIELDS.ALGORITHM}
              id={FIELDS.ALGORITHM}
              onChange={(e) =>
                dispatch({
                  type: Actions.FIELDS,
                  field: FIELDS.ALGORITHM,
                  payload: e.target.value,
                })
              }
            >
              <option value={ALGORITHMS.BUBBLE_SORT}>Bubble Sort</option>
              <option value={ALGORITHMS.INSERTION_SORT}>Insertion Sort</option>
              <option value={ALGORITHMS.MERGE_SORT}>Merge Sort</option>
              <option value={ALGORITHMS.SELECTION_SORT}>Selection Sort</option>
            </select>
          </div>

          <button className="btn-primary">Randomize Array</button>
          <button className="btn-primary">Start Visualization</button>
        </div>
        <div className="secondary-controls flex mt-2">
          <div className="flex">
            <label htmlFor={FIELDS.SIZE}>Size: &nbsp;</label>
            <input
              type="range"
              min={10}
              max={maxArraySize}
              step={10}
              name={FIELDS.SIZE}
              id={FIELDS.SIZE}
              onChange={(e) =>
                dispatch({
                  type: Actions.FIELDS,
                  field: FIELDS.SIZE,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex">
            <label htmlFor={FIELDS.SPEED}>Speed: &nbsp;</label>
            <input
              type="range"
              min={0}
              max={100}
              step={10}
              name={FIELDS.SPEED}
              id={FIELDS.SPEED}
              onChange={(e) =>
                dispatch({
                  type: Actions.FIELDS,
                  field: FIELDS.SPEED,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex">
            <label htmlFor={FIELDS.BAR_COLOR}>Bar Color: &nbsp;</label>
            <input
              type="color"
              name={FIELDS.BAR_COLOR}
              id={FIELDS.BAR_COLOR}
              defaultValue={"#000000"}
              onChange={(e) =>
                dispatch({
                  type: Actions.FIELDS,
                  field: FIELDS.BAR_COLOR,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex">
            <label htmlFor={FIELDS.BG_COLOR}>Background Color: &nbsp;</label>
            <input
              type="color"
              name={FIELDS.BG_COLOR}
              id={FIELDS.BG_COLOR}
              defaultValue={"#ffffff"}
              onChange={(e) =>
                dispatch({
                  type: Actions.FIELDS,
                  field: FIELDS.BG_COLOR,
                  payload: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Visualizer;
