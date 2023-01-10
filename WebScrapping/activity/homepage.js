// npm install request

let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const getAllmatches = require("./allMatches");

let link = "https://2022.t20worldcup.com/fixtures";

request(link, cb);

function cb(error, response, html) {
    if (error == null && response.statusCode == 200) {
        parseData(html);
    } else if (response.statusCode == 404) {
        console.log("Page Not Found");
    } else {
        console.log(error);
    }
}

function parseData(html) {
    // fs.writeFileSync("./home.text",html);
    let ch = cheerio.load(html);

    let completeLink = "https://2022.t20worldcup.com/fixtures";
    // console.log(completeLink);
    getAllmatches(completeLink);

}
