import React, { useEffect, useState } from "react";
import { AwesomeButton } from "react-awesome-button";

import Board from "../Board";

import "./Body.scss";

const Body = () => {
  const [start, setStart] = useState();
  const [resetting, setResetting] = useState();

  const handleSimulationEnd = () => {
    setStart(null);
  };
  const handleResettingEnd = () => {
    setResetting(null);
  }

  return (
    <div className="body-ctn">
      <div className="body-offset"></div>
      <div className="body-content">
        <Board simulating={start} onSimulationEnd={handleSimulationEnd} resetting={resetting} onResettingEnd={handleResettingEnd} />
        <div className="button-bar">
          <AwesomeButton
            ripple
            type="primary"
            disabled={start}
            onPress={() => setStart(true)}
          >
            Start
          </AwesomeButton>
          <AwesomeButton
            ripple
            type="secondary"
            disabled={start}
            onPress={() => setResetting(true)}
          >
            Reset
          </AwesomeButton>
          <AwesomeButton ripple disabled type="secondary">
            Edit
          </AwesomeButton>
        </div>
      </div>
      <div className="body-offset"></div>
    </div>
  );
};

export default Body;
