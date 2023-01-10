// npm install request

let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const getMatchDetails = require("./match");

function getAllmatches(link) {
    request(link, cb);

}

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
    // console.log(html);
    let ch=cheerio.load(html);
    let allAtags=ch(".match-block__body.col-12 .match-block__link");
    // console.log(allAtags.attr("href"));
    console.log(allAtags.length);

    for(let i=0;i<allAtags.length;i++){
        let link=ch(allAtags[i]).attr("href");
        // console.log(link);
        let matchlink="https://2022.t20worldcup.com"+link;
        // console.log(matchlink);
        getMatchDetails(matchlink);
    }

}

module.exports=getAllmatches;