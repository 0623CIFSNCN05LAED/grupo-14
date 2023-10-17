const db = require("../data/db");

const userServices = {
  createUser: function (user) {
    db.users.create(user);
  },
};

module.exports = userServices;
