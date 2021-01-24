const _ = require("underscore");
const request = require("request");
const User = require("../models/User");

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  User.find()
    .select("profile.name")
    .select("profile.website")
    .select("profile.picture")
    .exec((err, users) => {
      if (err) {
        return;
      }

      console.log(users);

      if (100 - users.length > 0) {
        let options = {
          url: `https://uifaces.co/api?limit=${200 - users.length}&random`,
          headers: {
            "X-API-KEY": "73188088aadd0280d27c736ca4beaa"
          }
        };

        request(options, (err, response, body) => {
          console.log([...JSON.parse(body), ...users]);
          res.render("home", {
            title: "Home",
            users: [...JSON.parse(body), ...users]
          });
        });
      } else {
        res.render("home", {
          title: "Home",
          users: users
        });
      }

      /*
      request(options, (err, response, body) => {
        res.render("home", {
          title: "Home",
          users: JSON.parse(body)
        });
      });*/
    });

  /*
  let options = {
    url: "https://uifaces.co/api?limit=200&random",
    headers: {
      "X-API-KEY": "73188088aadd0280d27c736ca4beaa"
    }
  };

  request(options, (err, response, body) => {
    res.render("home", {
      title: "Home",
      users: JSON.parse(body)
    });
  });*/
};
