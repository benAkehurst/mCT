var express = require("express");
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/scrapeTlv", function(req,res){
    tlv = "https://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854";
    request(tlv, function(err, resp, html) {
        if (!err){
            const $ = cheerio.load(html);
            const otherData = [];
            const loc = "Tel Aviv, Israel";
            const temp = $('.forecast > .info > .temp > .large-temp').text();
            const currentConditions = $('.forecast > .info > .cond').text();
            $('.more-info > .stats > li').each(function(i, elem) {
                otherData[i] = $(this).text();
            });
            otherData.join(', ');
            const obj = {location: loc, temp: temp, currentConditions: currentConditions, otherData:otherData};
            // console.log(JSON.stringify(obj));
            // console.log(second);
            res.send({tlv:obj});
        }
        else{
            console.log(err);
        }
    });
});
app.get("/scrapeLdn", function(req,res){
    ldn = "https://www.accuweather.com/en/gb/london/ec4a-2/current-weather/328328";
    request(ldn, function(err, resp, html) {
        if (!err){
            const $ = cheerio.load(html);
            const otherData = [];
            const loc = "London, United Kingdom";
            const temp = $('.forecast > .info > .temp > .large-temp').text();
            const currentConditions = $('.forecast > .info > .cond').text();
            $('.more-info > .stats > li').each(function(i, elem) {
                otherData[i] = $(this).text();
            });
            otherData.join(', ');
            const obj = {location: loc, temp: temp, currentConditions: currentConditions, otherData:otherData};
            // console.log(JSON.stringify(obj));
            // console.log(second);
            res.send({ldn:obj});
        }
        else{
            console.log(err);
        }
    });
});

app.listen(4200,function(){
    console.log("Running on http://localhost:4200");
});