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
  visualization_size: number;
  visualization_speed: number;
  background_color: string;
  bar_color: string;
  comparison_color: string;
  sorted_color: string;
}

const settingsInitialState: SettingState = {
  algorithm_type: ALGORITHMS.BUBBLE_SORT,
  visualization_size: 20,
  visualization_speed: 10,
  background_color: "#ffffff",
  bar_color: "#413e3e",
  comparison_color: "#003399",
  sorted_color: "green",
};

const Visualizer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, settingsInitialState);
  const {
    algorithm_type,
    visualization_size,
    visualization_speed,
    background_color,
    bar_color,
    comparison_color,
    sorted_color,
  } = state;

  const [array, setArray] = useState([]);
  const [maxArraySize, setMaxArraySize] = useState(0);
  const [rotateX, setRotateX] = useState(true);
  const [rotateY, setRotateY] = useState(false);
  useEffect(() => {
    const barContainerPixels =
      document.getElementById("bar-container").clientWidth;
    setMaxArraySize(barContainerPixels);
  }, []);
  useEffect(() => {
    randomizeArray();
  }, [visualization_size]);
  var audioCtx = new window.AudioContext();

  function beep(duration?, frequency?, volume?, type?, callback?) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (volume) {
      gainNode.gain.value = volume;
    }
    if (frequency) {
      oscillator.frequency.value = frequency;
    }
    if (type) {
      oscillator.type = type;
    }
    if (callback) {
      oscillator.onended = callback;
    }

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + (duration || 500) / 1000);
  }
  const randomizeArray = () => {
    const ele = document.querySelectorAll(".bar") as any;
    ele.forEach((element) => {
      element.style.background = bar_color;
    });
    const tempArray = [];
    const limit = state.visualization_size;
    for (let i = 0; i < limit; i++) {
      tempArray.push(Math.floor(Math.random() * (500 - 5 + 1) + 5));
    }
    setArray(tempArray);
  };
  function waitforme(milisec) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, milisec);
    });
  }

  async function bubble() {
    const ele = document.querySelectorAll(".bar") as any;
    for (let i = 0; i < ele.length - 1; i++) {
      for (let j = 0; j < ele.length - i - 1; j++) {
        ele[j].style.background = comparison_color;
        ele[j + 1].style.background = comparison_color;
        if (
          parseFloat(ele[j].style.height) < parseFloat(ele[j + 1].style.height)
        ) {
          await waitforme(Math.abs(visualization_speed - 100));
          swap(ele[j], ele[j + 1]);
        }
        ele[j].style.background = bar_color;
        ele[j + 1].style.background = bar_color;
      }
      ele[ele.length - 1 - i].style.background = sorted_color;
      beep(
        40,
        15 * parseFloat(ele[ele.length - 1 - i].style.height),
        0.3,
        "sine"
      );
    }
    ele[0].style.background = sorted_color;
  }
  function swap(el1, el2) {
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
  }
  const startVisualization = () => {
    switch (algorithm_type) {
      case ALGORITHMS.BUBBLE_SORT:
        bubble();
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <div className="visualizer container mb-2">
        <div
          className={`bar-container ${rotateX ? "rotateX" : ""} ${
            rotateY ? "rotateY" : ""
          }`}
          id="bar-container"
          style={{ backgroundColor: background_color }}
        >
          <Bars
            arrayData={array}
            barColor={bar_color}
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

          <button
            className="btn-primary"
            onClick={() => {
              setRotateX(!rotateX);
            }}
          >
            Rotate X
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              setRotateY(!rotateY);
            }}
          >
            Rotate Y
          </button>
          <button className="btn-primary" onClick={randomizeArray}>
            Randomize Array
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload
          </button>
          <button className="btn-primary" onClick={startVisualization}>
            Start Visualization
          </button>
        </div>
        <div className="secondary-controls flex mt-2">
          <div className="flex">
            <label htmlFor={FIELDS.SIZE}>Size: &nbsp;</label>
            <input
              type="range"
              min={10}
              max={250}
              step={5}
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
              min={1}
              max={101}
              step={5}
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
              defaultValue={bar_color}
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
        <div className="secondary-controls flex mt-2">
          <div className="flex">
            <label htmlFor={FIELDS.COMPARISON_COLOR}>
              Comparison Bar Color: &nbsp;
            </label>
            <input
              type="color"
              name={FIELDS.COMPARISON_COLOR}
              id={FIELDS.COMPARISON_COLOR}
              defaultValue={"#003399"}
              onChange={(e) =>
                dispatch({
                  type: Actions.FIELDS,
                  field: FIELDS.COMPARISON_COLOR,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex">
            <label htmlFor={FIELDS.SORTED_COLOR}>
              Sorted Bar Color: &nbsp;
            </label>
            <input
              type="color"
              name={FIELDS.SORTED_COLOR}
              id={FIELDS.SORTED_COLOR}
              defaultValue={"#009900"}
              onChange={(e) =>
                dispatch({
                  type: Actions.FIELDS,
                  field: FIELDS.SORTED_COLOR,
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
