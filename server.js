var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var content  ={

    tilte: 'personal',
    heading:'profession',
    content: ` <p>
                this is my special qualifications
                list of my work experiences
                   1.    i have finished online certificate courses from nptel 
                        2.    i have created my own web app from my online certificates course
            </p>`
    
    
    
    
    
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/PERSONAL', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','personal.html'));
});

app.get('/PROFESSION', function (req, res) {
    res.sendFile(path.join(__dirname,'ui','profession.html'));
});

app.get('/myexperience', function (req, res) {
     res.sendFile(path.join(__dirname,'ui','myexperience.html'));

});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
