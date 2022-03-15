import * as d3 from "d3";
import { SQ_COLOR } from "../constants";

const addSq = (props) => {
  const defaultCtx = {
    x: 0,
    y: 0,
    height: 20,
    width: 20,
    stroke: "black",
    fill: "#d3d3d3",
    id: 1,
  };
  const ctx = { ...defaultCtx, ...props };
  const anchor = ctx.svg.append("g").attr("x", ctx.x).attr("y", ctx.y);

  anchor
    .append("text")
    .attr("x", ctx.x + 10 - 4 * (ctx.id.toString().length - 1))
    .attr("y", ctx.y + 20)
    .text(ctx.id);

  anchor
    .append("rect")
    .attr("x", ctx.x)
    .attr("y", ctx.y)
    .attr("width", ctx.width)
    .attr("height", ctx.height)
    .attr("stroke", ctx.stroke)
    .attr("fill", ctx.fill)
    .style("opacity", 0.75)
    .on("mouseover", function (d) {
      d3.select(this).style("stroke", SQ_COLOR.HOVER);
    })
    .on("mouseout", function (d) {
      d3.select(this).style("stroke", SQ_COLOR.DEAD);
    });
};

const changeColor = (props) => {
  const defaultCtx = { idx: 0, color: SQ_COLOR.SPECIAL };
  const ctx = { ...defaultCtx, ...props };

  const group = document.querySelector("#squares-board");
  const node = group.getElementsByTagName("rect")[ctx.idx];

  d3.select(node).attr("fill", ctx.color);
};

const addBoard = (props) => {
  const defaultCtx = {
    rows: 10,
    cols: 20,
    height: 30,
    width: 30,
    x_offset: 5,
    y_offset: 5,
  };
  const ctx = { ...defaultCtx, ...props };

  for (let i = 0; i < ctx.rows; ++i) {
    for (let j = 0; j < ctx.cols; ++j) {
      addSq({
        ...ctx,
        x: ctx.x_offset * (j + 1) + ctx.width * j,
        y: ctx.y_offset * (i + 1) + ctx.height * i,
        id: i * ctx.cols + j + 1,
      });
    }
  }
};

export { addSq, addBoard, changeColor };
