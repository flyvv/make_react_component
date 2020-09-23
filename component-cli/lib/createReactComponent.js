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
  whatSX
) {
  switch (dirNames.length) {
    case 0:
      throw Error("请输入组件名称");
    case 1:
      createOne(dirNames[0], cssType, usePureComponent, whatSX);
      break;
    default:
      createMulti(dirNames, cssType, usePureComponent, whatSX);
      break;
  }
};

function createOne(dirName, cssType, usePureComponent, whatSX) {
  var dirPath = path.join(dirName);
  createFiles(dirPath, dirName, cssType, usePureComponent, whatSX);
}

function createMulti(dirNames, cssType, usePureComponent, whatSX) {
  dirNames.forEach(function (ele) {
    var dirPath = path.join(ele);
    createFiles(dirPath, ele, cssType, usePureComponent, whatSX);
  });
}

function createFiles(dirPath, dirName, cssType, usePureComponent, whatSX) {
  fs.mkdirSync(dirPath);

  writeTsx(dirPath, dirName, fs, cssType, usePureComponent, whatSX);
  writeCss(dirPath, dirName, fs, cssType);
}