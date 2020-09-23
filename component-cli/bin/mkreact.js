#!/usr/bin/env node
"use strict";
const createReactComponent = require("../lib/createReactComponent");
const program = require("commander");
function parseVal(val) {
  return val.split(",");
}
function log(name, componentStatus, style, whatSX) {
  console.log("starting...");
  console.log("name:", name, "style:", [style], "whatSX:", [whatSX]);
  console.log(
    `you will create ${componentStatus}component ${name} with ${style} and ${whatSX}`
  );
}

function getDirName(param) {
  return param[2].split(",");
}

(function () {
  let usePureComponent = false;
  let componentStatus = "";
  let style = "css";
  let whatSX = "tsx";
  let name;

  program
    .version("1.0.4")
    .option("-s --scss [names]", "replace css to Scss", parseVal)
    .option("-l --less [names]", "replace css to Less", parseVal)
    .option("-p --pure [names]", "use pure component", parseVal)
    .option("-j --jsx [names]", "use jsx component", parseVal)
    .option("-t --tsx [names]", "use tsx component", parseVal)
    .parse(process.argv);

  name = getDirName(process.argv);
  if (program.pure) {
    usePureComponent = true;
    componentStatus = "pure ";
  }
  if (program.scss) {
    style = "scss";
  } else if (program.less) {
    style = "less";
  }

  if (program.tsx) {
    whatSX = "tsx";
  } else if (program.jsx) {
    whatSX = "jsx";
  }
  log(name, componentStatus, style, whatSX);
  createReactComponent(name, style, usePureComponent, whatSX);
  console.log(["done!"]);
})();