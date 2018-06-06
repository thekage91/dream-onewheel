const _ = require("underscore");
const request = require("request");

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
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
  });
};
