var express = require('express');
var path = require('path');
var http = require('http');
var createError = require('http-errors');
var config = require('./config/index.js');
var log = require('./libs/log');
var url = require('url');
var async = require('async');

const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(config.get('dbUrl'), { useNewUrlParser: true, useUnifiedTopology: true});

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.set("port", config.get('port'));

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    app.locals.db = client.db("abithelper");
    http.createServer(app).listen(app.get('port'), function() {
      log.info("Express server is listening on port " + config.get('port'));
    });
});


//Middleware

// view engine setup
app.engine('ejs', require("ejs-locals"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res, next) {
  res.render("index", {});
});

app.get("/findvuz", function(req, res, next) {
  res.render("findVuzi", {});
});

app.get("/countchance", function(req, res, next) {
  res.render("countChance", {});
});

app.get("/aboutus", function(req, res, next) {
  res.render("aboutus", {});
});

app.get("/api/specs", function(req, res, next) {

  let params = req.query;
  const collection = app.locals.db.collection('specs');

  //console.log(params);

  if (Object.keys(params).length != 0) {

    if (params.attribute) {

      collection.find({}).toArray(function(err, results){
            if(err) return console.log(err);
            let attributesArr = [];
            for (result of results) {
              attributesArr.push(result[params.attribute]);
            }
            res.send(attributesArr);
      });

    } else if (params.filter && params.value) {

        if(/^\d+[.,]?\d+$/.test(params.value)) {
          params.value = parseFloat(params.value);
        }

      collection.find({ [params.filter.toString()]: params.value }).toArray(function(err, results){
            if(err) return console.log(err);
            let resultsArr = [];
            for (result of results) {
              resultsArr.push(result);
            }
            res.send(resultsArr);
      });

    } else if (params.find && params.value) {

      collection.find({}).toArray(function(err, results){
            if(err) return console.log(err);

            let resultsArr = [];
            for (result of results) {
              resultsArr.push(result);
            }

            let matchArr = [];
            for(result of resultsArr) {
              if (result[params.find]) {
                if (result[params.find].toString().toLowerCase().includes(params.value.toLowerCase())) {
                  matchArr.push(result);
                }
              }
            }

            res.send(matchArr);
      });

    }
  } else {
    collection.find({}).toArray(function(err, results){
          if(err) return console.log(err);
          let resultsArr = [];
          for (result of results) {
            resultsArr.push(result);
          }
          res.send(resultsArr);
    });
  }

});

app.get("/api/regions", function(req, res, next) {

  let params = req.query;
  const collection = app.locals.db.collection('regions');

  //console.log(params);

  if (Object.keys(params).length != 0) {

    if (params.attribute) {

      collection.find({}).toArray(function(err, results){
            if(err) return console.log(err);
            let attributesArr = [];
            for (result of results) {
              attributesArr.push(result[params.attribute]);
            }
            res.send(attributesArr);
      });

    } else if (params.filter && params.value) {

      collection.find({ [params.filter.toString()]: params.value }).toArray(function(err, results){
            if(err) return console.log(err);
            let resultsArr = [];
            for (result of results) {
              resultsArr.push(result);
            }
            res.send(resultsArr);
      });

    } else if (params.find && params.value) {

      collection.find({}).toArray(function(err, results){
            if(err) return console.log(err);

            let resultsArr = [];
            for (result of results) {
              resultsArr.push(result);
            }

            let matchArr = [];
            for(result of resultsArr) {
              if (result[params.find]) {
                if (result[params.find].toString().toLowerCase().includes(params.value.toLowerCase())) {
                  matchArr.push(result);
                }
              }
            }

            res.send(matchArr);
      });

    }
  } else {
    collection.find({}).toArray(function(err, results){
          if(err) return console.log(err);
          let resultsArr = [];
          for (result of results) {
            resultsArr.push(result);
          }
          res.send(resultsArr);
    });
  }

});

app.get("/api/vuzi", function(req, res, next) {
  let params = req.query;
  const collection = app.locals.db.collection('vuzi');

  if (Object.keys(params).length != 0) {

    if (params.attribute) {

      collection.find({}).toArray(function(err, results){
            if(err) return console.log(err);
            let attributesArr = [];
            for (result of results) {
              attributesArr.push(result[params.attribute]);
            }
            res.send(attributesArr);
      });

    } else if (params.filter && params.value) {

      collection.find({ [params.filter.toString()]: params.value }).toArray(function(err, results){
            if(err) return console.log(err);
            let resultsArr = [];
            for (result of results) {
              resultsArr.push(result);
            }
            res.send(resultsArr);
      });

    } else if (params.find && params.value) {

      collection.find({}).toArray(function(err, results){
            if(err) return console.log(err);

            let resultsArr = [];
            for (result of results) {
              resultsArr.push(result);
            }

            let matchArr = [];
            for(result of resultsArr) {
              if (result[params.find]) {
                if (result[params.find].toString().toLowerCase().includes(params.value.toLowerCase())) {
                  matchArr.push(result);
                }
              }
            }

            res.send(matchArr);
      });

    }

  } else {
    collection.find({}).toArray(function(err, results){
          if(err) return console.log(err);
          let resultsArr = [];
          for (result of results) {
            resultsArr.push(result);
          }
          res.send(resultsArr);
    });
  }
});

app.get("/api/vuzi/:code", function(req, res, next) {
  const collection = app.locals.db.collection('vuzi');
  var vuzCode = +req.params.code;

  collection.findOne({code: vuzCode}, function(err, result){
        if(err) return console.log(err);
        res.send(result);
  });
});

app.get("/api/konkurs", function(req, res, next) {
  let params = req.query;
  const collection = app.locals.db.collection('konkurs');

  if (Object.keys(params).length != 0) {

    if (params.attribute) {

      collection.find({}).toArray(function(err, results){
            if(err) return console.log(err);
            let attributesArr = [];
            for (result of results) {
              attributesArr.push(result[params.attribute]);
            }
            res.send(attributesArr);
      });

    } else if (params.filter && params.value) {

      if(/^\d+[.,]?\d*$/.test(params.value)) {
        params.value = parseFloat(params.value);
      }

      collection.find({ [params.filter.toString()]: params.value }).toArray(function(err, results){
            if(err) return console.log(err);
            let resultsArr = [];
            for (result of results) {
              resultsArr.push(result);
            }
            res.send(resultsArr);
      });

    } else if (params.find && params.value) {

      collection.find({}).toArray(function(err, results){
            if(err) return console.log(err);

            let resultsArr = [];
            for (result of results) {
              resultsArr.push(result);
            }

            let matchArr = [];
            for(result of resultsArr) {
              if (result[params.find]) {
                if (result[params.find].toString().toLowerCase().includes(params.value.toLowerCase())) {
                  matchArr.push(result);
                }
              }
            }

            res.send(matchArr);
      });

    }

  } else {
    collection.find({}).toArray(function(err, results){
          if(err) return console.log(err);
          let resultsArr = [];
          for (result of results) {
            resultsArr.push(result);
          }
          res.send(resultsArr);
    });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send(404, "404 Page not found");
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
