import { useState, useEffect, useMemo, useCallback } from "react";
interface Options {
  time: string;
  count: string;
}
const App = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [count, setCount] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [options, setOptions] = useState<Options>({ time: "", count: "" });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log("options", options);
    let interval: any;
    if (started) {
      interval = setInterval(() => {
        setOptions((prev) => {
          if (prev.time === "0") {
            clearInterval(interval);
            setStarted(false);
            return prev;
          }
          return {
            ...prev,
            time: String(Number(prev.time) - 1),
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started, options.time]);
  const handleStartButton = () => {
    if (options.time === "" || options.count === "") {
      setError("Please enter both time and count");
      return;
    } else {
      setError("");
      setStarted(true);
      setTime(time);
    }
  };

  return (
    <>
      <h1>No of clicks before time expires</h1>
      <div className="wrapper">
        <div className="options">
          <div className="setTime">
            <h2>Set time</h2>
            <input
              disabled={started}
              value={options.time}
              onChange={(e) => {
                setOptions({ ...options, time: e.target.value });
              }}
              type="number"
              placeholder="Enter time in seconds"
            />
          </div>
          <div className="setCount">
            <h2>Set Count</h2>
            <input
              disabled={started}
              value={options.count}
              onChange={(e) => {
                setOptions({ ...options, count: e.target.value });
              }}
              type="number"
              placeholder="Enter Count"
            />
          </div>
          {error && <p>{error}</p>}
          <button onClick={() => handleStartButton()}>Start</button>
        </div>
        <div className="count">
          <h1>Count : {count}</h1>
        </div>
        <div className="time__screen">
          <h2>
            Time left:{" "}
            {Number(options.time) > 1
              ? `${options.time} seconds`
              : `${options.time} second`}
          </h2>
        </div>
        <button onClick={(() => setCount(prev => {
            if(Number(prev) < Number(options.count)-1){
                return (Number(prev)+1).toString();
            }else{
                alert("Finished");
                setStarted(false)
                return "";
            }
        }))} className={`${started ? "" : "hidden"}`}>+</button>
      </div>
    </>
  );
};

export default App;
