function User({ username}) {
    this.username = username;
    this._id = new Date().getTime().toString();
  }
  
  function Exercise({ _id, username, description, duration, date}) {
    this.username = username;
    this.description = description;
    this.duration = duration;
    this.date = date;
    this._id = _id;
  }
  
  function UserLog({ username, count, log }) {
    this.username = username;
    this.count = count;
    this._id = new Date().getTime();
    this.log = log
  }
  
  function Log({ description, duration, date }) {
    this.description = description;
    this.duration = duration;
    this.date = date
  }

  module.exports = {
    User, Exercise, UserLog, Log
  }