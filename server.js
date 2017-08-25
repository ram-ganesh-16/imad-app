var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;

var config = {
    user:'ganeshganni111',
    database:'ganeshganni111',
    host:'db.imad.hasura.imad.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var personal={

    ganesh: 'personal',
    heading:'profession',
    content:
    ` 
    
            <p>
                this is my special qualifications
            </p>
            <p>
                list of my work experiences
                   1.    i have finished online certificate courses from nptel 
                        2.    i have created my own web app from my online certificates course
            </p>`
    
    
    
    
    
};
var profession={
    ganesh: 'personal',
    heading:'profession',
    content:
    ` 
    
            <p>
                this is my special qualifications
            </p>
            <p>
                list of my work experiences
                   1.    i have finished online certificate courses from nptel 
                        2.    i have created my own web app from my online certificates course
            </p>`
    
    
    
    };
var mylife={ 
    ganesh: 'personal',
    heading:'profession',
    content:
    ` 
    
            <p>
                this is my special qualifications
            </p>
            <p>
                list of my work experiences
                   1.    i have finished online certificate courses from nptel 
                        2.    i have created my own web app from my online certificates course
            </p>`
    

};
function createtemplate(data){
    var ganesh= data.ganesh;
    var heading=data.heading;
    var content= data.content;
    
   var htmlTemplate=
    `<!doctype html>
    <head>
        <title>
            personal
            <hr/>
        </title>
        <meta name="viewport" content="width=device-width,inital scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />

     </head>
     <body>
     
     <div class=container>
        <div>
            <a href="/">home</a>
        </div>
     
        <div>
            <a href="/ui/style.css">styleofwebapp</a>
        </div>
         <h1>
         ${ganesh}
         </h1>
            
            <h1>
                ${heading}
            </h1>
            <div>
            ${content}
            
       </div> 
    </body>
</html>

`;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter',function(req, res) {
    counter=counter+1;
    res.send(counter.toString());
});

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('Select * FROM test',function(err,result){
       if(err){
           res.status (500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names=[]; 
app.get('/submit-name',function(req,res){
    var name=req.query.name;
    
    names.push(name);
    res.send(JSON.stringify(names));
    
});

app.get('/personal', function (req, res) {
     res.send((createtemplate(personal)));
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
