var express = require("express");
var request = require('request');
var cheerio = require('cheerio');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get("/scrapeTlv", function(req,res){
    tlv = "https://www.timeanddate.com/weather/israel/tel-aviv";
    request(tlv, function(err, resp, html) {
        if (!err){
            const $ = cheerio.load(html);
            const loc = $('h1').text();
            const temp = $('.h2').text();
            const humidity = $('#qfacts > p').text();
            const obj = {location: loc, temp: temp, humidity:humidity};
            console.log(JSON.stringify(obj));
            res.send({tlv:obj});
        }
        else{
            console.log(err);
        }
    });
});
app.get("/scrapeLdn", function(req,res){
    ldn = "https://www.timeanddate.com/weather/uk/london";
    request(ldn, function(err, resp, html) {
        if (!err){
            const $ = cheerio.load(html);
            const loc = $('h1').text();
            const temp = $('.h2').text();
            const humidity = $('#qfacts > p').text();
            const obj = {location: loc, temp: temp, humidity:humidity};
            console.log(JSON.stringify(obj));
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