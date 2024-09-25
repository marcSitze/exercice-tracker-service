const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const users = []
const exercices = []

app.post("/api/users", (req, res) => {

  const username = req.body.username;
  if (!username) {
    return res.json({ error: "bad request" })
  }

});

app.post("/api/users/:_id/exercices", (req, res) => {

});

app.get("/api/users/:_id/logs", (req, res) => {

});

function User({ username}) {
  this.username = username;
  this._id = new Date().getTime();
}

function Exercise({ username, description, duration, date}) {
  this.username = username;
  this.description = description;
  this.duration = duration;
  this.date = date;
  this._id = new Date().getTime();
}

function Log({ username, count,  }) {
    this.username = username;
    this.count = count;
    this._id = new Date().getTime();
    this.log = [{
      description: "test",
      duration: 60,
      date: "Mon Jan 01 1990",
    }]
}





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
