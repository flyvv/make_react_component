"use strict";

var fs = require("fs");
var path = require("path");
var _require = require("./writeFile.js"),
  writeCss = _require.writeCss,
  writeTsx = _require.writeTsx;
module.exports = function createReactComponent(
  dirNames,
  cssType,
  usePureComponent,
  whatSX,
  diyPath
) {
  switch (dirNames.length) {
    case 0:
      throw Error("请输入组件名称");
    case 1:
      createOne(dirNames[0], cssType, usePureComponent, whatSX, diyPath);
      break;
    default:
      createMulti(dirNames, cssType, usePureComponent, whatSX, diyPath);
      break;
  }
};

function createOne(dirName, cssType, usePureComponent, whatSX, diyPath) {
  var dirPath = path.join(dirName);

  createFiles(dirPath, dirName, cssType, usePureComponent, whatSX, diyPath);
}

function createMulti(dirNames, cssType, usePureComponent, whatSX, diyPath) {
  dirNames.forEach(function (ele) {
    var dirPath = path.join(ele);
    createFiles(dirPath, ele, cssType, usePureComponent, whatSX, diyPath);
  });
}

function createFiles(
  dirPath,
  dirName,
  cssType,
  usePureComponent,
  whatSX,
  diyPath
) {
  var fliename = path.join(`${process.cwd()}/${diyPath}`, dirPath);
  fs.mkdirSync(fliename);
  writeTsx(fliename, dirName, fs, cssType, usePureComponent, whatSX);
  writeCss(fliename, dirName, fs, cssType);
}