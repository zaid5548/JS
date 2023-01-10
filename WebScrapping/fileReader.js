// fs module => file system => file system


let fs = require("fs");
let cheerio = require("cheerio");

let fileData = fs.readFileSync("./f1.text", "utf-8");

let htmlData = fs.readFileSync("./index.html");

let ch = cheerio.load(htmlData);
// let msg=fileData+" This is added data";

let h1Data = ch("h1").text();

let h2Data = ch(".container h2").text();

// console.log(h1Data);

console.log(h2Data);
let msg = fileData + h2Data;
fs.writeFileSync("./f1.text", msg);