import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type){
    case "inc":
      return { ...state, count: state.count + state.step }
    case "dec":
      return { ...state, count: state.count - state.step }
    case "updateCount":
      return { ...state, count: action.payload }
    case "updateStep":
      return { ...state, step: action.payload }
    case "reset":
      return { count: 0, step: 1}
    default:
      throw new Error("Unknown Action")
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 }
  const [state, dispatch] = useReducer(reducer, initialState)

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: "dec", payload: state.step })
  };

  const inc = function () {
    dispatch({ type: "inc", payload: state.step })
  };

  const updateCount = function (e) {
    dispatch({ type: "updateCount", payload: e.target.value })
  };

  const defineStep = function (e) {
    dispatch({ type: "updateStep", payload: e.target.value })
  };

  const reset = function () {
    dispatch({ type: "reset" })
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={updateCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
