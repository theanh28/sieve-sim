import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";

import { addBoard, changeColor } from "../../d3Helper/drawShape";
import { SQ_COLOR } from "../../constants";
import "./Board.scss";
import { sieve_algo } from "../../algoHelper/sieve";

const colorizeLi = ({ svg, list }) => {
  let cur = 0;
  const timer = setInterval(() => {
    changeColor({
      svg,
      idx: list[cur] - 1,
      color: (cur === 0 && list[cur] !== 1) ? SQ_COLOR.SPECIAL : SQ_COLOR.NORMAL,
    });
    if (++cur === list.length) clearInterval(timer);
  }, 100);
};

const colorizeSq = (svg, { n }) => {
  const runs = sieve_algo(n);

  const delayApply = (func, props, delay) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(func(props));
      }, delay);
    });

  let promiseChain = delayApply(colorizeLi, { svg, list: runs[0] }, 100);

  for (let i = 1; i < runs.length; ++i) {
    const delay = 115 * runs[i - 1].length;
    promiseChain = promiseChain.then(() =>
      delayApply(colorizeLi, { svg, list: runs[i] }, delay)
    );
  }

  return promiseChain;
};

const resetBoard = ({ n }) => {
  for (let i = 0; i < n; ++i) {changeColor({idx: i, color: SQ_COLOR.IDLE})}
};

function Board({ simulating, onSimulationEnd, resetting, onResettingEnd }) {
  const bRef = useRef();

  const [svg, setSvg] = useState();
  const [loading, setLoading] = useState();
  const [simConfig, setSimConfig] = useState({ n: 200 });

  useEffect(() => {
    // fetching
    setLoading(1);
  });

  useEffect(() => {
    if (!loading) return;

    const svg = d3
      .select(bRef.current)
      .append("svg")
      .attr("width", 705)
      .attr("height", 380)
      .append("g")
      .attr("id", "squares-board");

    addBoard({ svg, cols: 20, rows: 10 });

    setSvg(svg);

    return () => svg.remove();
  }, [loading]);

  useEffect(() => {
    if (simulating) {
      resetBoard(simConfig);
      colorizeSq(svg, simConfig).then(onSimulationEnd);
    }
  }, [simulating]);

  useEffect(() => {
    if (resetting) {
      resetBoard(simConfig);
      onResettingEnd();
    }
  }, [resetting]);

  return !loading ? null : <div ref={bRef} className="board"></div>;
}

export default Board;
