const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});
