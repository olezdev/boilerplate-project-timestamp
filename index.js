// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const enableCORS = function (req, res, next) {
  if (!process.env.DISABLE_XORIGIN) {
    const allowedOrigins = ["https://www.freecodecamp.org"];
    const origin = req.headers.origin;
    if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      console.log(req.method);
      res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      });
    }
  }
  next();
}

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  console.log(date)

  if (!date || date.trim() === '') {
    const currentDate = new Date();
    return res.status(200).json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    });
  }

  let providedDate;
  if (!isNaN(date)) {
    providedDate = new Date(parseInt(date));
  } else {
    providedDate = new Date(date);
  }

  if (isNaN(providedDate.getTime())) {
    return res.status(400).json({
      error: "Invalid Date"
    });
  }

  return res.status(200).json({
    unix: providedDate.getTime(),
    utc: providedDate.toUTCString()
  })
})

// listen for requests :)
const port = process.env.PORT || 3000;

const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
