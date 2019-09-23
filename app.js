//storing dependencies into a variable
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//storing port number and our full app
var port = 3000;
var app = express();

// STEP 1:setting up the biolerplate and routing
app.get('/', function(req, res){
  //All the web scraping magic will happen here

  // storing url
  var url = 'https://en.wikipedia.org/wiki/Neptune';

  // making http request
  request(url, function(error, response, html){
    if(!error) {
      // res.send(html);
      var $ = cheerio.load(html);
      var data = {
        articleTitle : '',
        articleImg : '',
        articleParagraph : ''
      };

      $('#content').filter(function(){

        data.articleTitle = $(this).find('#firstHeading').text();
        data.articleImg = $(this).find('img').first().attr('src');
        data.articleParagraph = $(this).find('p:nth-of-type(2)').text();

      });

      res.send(data);

      fs.writeFile('wiki-output.js',JSON.stringify(data, null, 4), function(err){
        console.log('File written on hard drive');
      });
    }
  });

  // res.send('Hello Wolrd!');
});

app.listen(port);
console.log('Magic happens on port' + port);

exports = module.exports = app;
