const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()
const { User, Exercise, UserLog, Log } = require("./models")

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const users = []
const exercices = []
const usersLogs = []

app.post("/api/users", (req, res) => {

  const username = req.body.username;
  if (!username) {
    return res.json({ error: "bad request" })
  }

  const findUser = users.find(user => user.username === username);
  if(findUser) return res.json(findUser);

  const newUser = new User({ username })
  users.push(newUser);

  res.json(newUser);
});

app.get("/api/users", (req, res) => {
  res.json(users)
})

app.post("/api/users/:_id/exercises", (req, res) => {

  const userId = req.params._id;
  const { _id, description, duration, date } = req.body;
  if (!userId) {
    return res.json({ error: "bad request" })
  }

  if (!description || !duration) {
    return res.json({ error: "bad request required info missing" })
  }

  const findUser = users.find(user => String(user._id) === String(userId));
  if(!findUser) return res.json({ error: "User not found" });

  const newExercise = new Exercise({
    username: findUser.username,
    date: new Date(date).toDateString(),
    description,
    duration: Number(duration),
    _id: userId
  })

  exercices.push(newExercise)

  // const userLog = usersLogs.find(item => item.username === findUser.username)
  // if (!userLog) {
  //   const newUserLog = new UserLog({ username: findUser.username, count: 1, log: [new Log({ date, description, duration})] })
  // }
  res.json(newExercise);
});

app.get("/api/users/:_id/logs?", (req, res) => {
  const userId = req.params._id;
  if (!userId) {
    return res.json({ error: "bad request userId missing" })
  }

  const findUser = users.find(user => String(user._id) === String(userId));
  if(!findUser) return res.json({ error: "User not found" });

  // logic to query data // from, to, limit
  const { from, to, limit } = req.query

  const userExercices = exercices.filter(exercise => String(exercise._id) === userId)
  console.log({ userExercices })
  const userExercisesWithLimit = !limit ? userExercices: userExercices.slice(0, Number(limit))
  
  const userExercicesPerRange = userExercisesWithLimit
  .filter(item => (from ? new Date(item.date) >= new Date(from): true) && (to ? new Date(item.date) <= new Date(to): true))
  const isRange = from || to
  
  res.json({
    _id: userId,
    username: findUser.username,
    count: userExercices.length,
    log: isRange ? userExercicesPerRange : userExercisesWithLimit.map(item => ({
      description: item.description,
      duration: Number(item.duration),
      date: item.date
    }))
  })
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
