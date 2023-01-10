// npm install request

let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const getAllmatches = require("./allMatches");

function getMatchDetails(link) {
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
    let ch = cheerio.load(html);
    // console.log(html);
    let bothInnigs = ch(".mc-scorecard__innings.js-innings-tab .wrapper");
    // console.log(bothInnigs);
    for (let i = 0; i < bothInnigs.length; i++) {
        // fs.writeFileSync("./both"+i+".html", ch(bothInnigs[i]).text());
        // console.log(ch(bothInnigs[i]).text());
        let teamName = ch(bothInnigs[i]).find(".mc-scorecard__title.mc-scorecard__title--desktop").text();
        teamName = teamName.split("Batting")[0].trim();
        // console.log(teamName)

        let allTrs = ch(bothInnigs[i]).find(".table.mc-scorecard__table tbody .table-body");
        // console.log(allTrs.length);

        for (let j = 0; j < 11; j++) {
            let allTds = ch(allTrs[j]).find("td");
            // if(allTds.length>0){

            // }
            let batsman = ch(allTds[0]).find(".mc-scorecard__player-name.long").text().trim();
            let run = ch(allTds[1]).text().trim();
            let ball = ch(allTds[2]).text().trim();
            let four = ch(allTds[3]).text().trim();
            let six = ch(allTds[4]).text().trim();
            let strikeRate = ch(allTds[5]).text().trim();
            // console.log(`Batsman = ${batsman} Run = ${run} Ball = ${ball} Four = ${four} Six = ${six} Strike-Rate = ${strikeRate}`);
            let score = `Batsman = ${batsman} Run = ${run} Ball = ${ball} Four = ${four} Six = ${six} Strike-Rate = ${strikeRate}`;
            // fs.writeFileSync("./team"+j+".html",score);
            processDetails(teamName, batsman, run, ball, four, six, strikeRate);

        }

    }
    // console.log("**********************************************");
}

function checkTeamFolder(teamName){
    return fs.existsSync(teamName);
}

function checkBatsmanFile(teamName,batsman){
    let batsmanPath=`${teamName}/${batsman}.json`;
    return fs.existsSync(batsmanPath);
}

function updateBatsmanFile(teamName,batsman,run,ball,four,six,strikeRate){
    let batsmanPath=`${teamName}/${batsman}.json`;
    let batsmanFile=fs.readFileSync(batsmanPath);
    batsmanFile=JSON.parse(batsmanFile);
    let inning={
        Runs:run,
        Balls:ball,
        Four:four,
        Six:six,
        Strike_Rate:strikeRate
    }
    batsmanFile.push(inning);
    batsmanFile=JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath,batsmanFile);
}

function createBatsmanFile(teamName,batsman,run,ball,four,six,strikeRate){

    let batsmanPath=`${teamName}/${batsman}.json`;

    let batsmanFile=[];

    let inning={
        Runs:run,
        Balls:ball,
        Four:four,
        Six:six,
        Strike_Rate:strikeRate
    }

    batsmanFile.push(inning);
    batsmanFile=JSON.stringify(batsmanFile);
    fs.writeFileSync(batsmanPath,batsmanFile);
}

function createTeamFolder(teamName){
    fs.mkdirSync(teamName);
}

function processDetails(teamName, batsman, run, ball, four, six, strikeRate) {

    // check if team folder is exist
    let isTeamFolder = checkTeamFolder(teamName);

    if (isTeamFolder) {
        let isBatsman = checkBatsmanFile(teamName, batsman);

        if (isBatsman) {
            updateBatsmanFile(teamName, batsman, run, ball, four, six, strikeRate);
        } else {
            createBatsmanFile(teamName, batsman, run, ball, four, six, strikeRate);
        }
    }else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName,batsman,run,ball,four,six,strikeRate);
    }
}


module.exports = getMatchDetails;