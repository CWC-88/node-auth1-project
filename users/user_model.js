const db = require('../database/dbconfig');

module.exports = {
    add,
    getting,
    isValid
  }

  function add(user){
      const newUser = db("users").insert(user)
      return newUser
  }

function getting(gotBy){
    return db("users")
    .select("id","username","password")
    .where(gotBy)
}

function getAllUsers() {
    return db("users")
  }

  function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string" )
}