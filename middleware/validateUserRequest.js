var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;

module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if the app
  // is safe.

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../config/tokenSecret.js')());

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Sorry, your Token Expired"
        });
        return;
      }

      // Authorize the User - The key would be the logged in user's username

      var dbUser = validateUser(key);

      if (dbUser) {
        if ((req.url.indexOf('admin') >= 0 && dbUser.accessRights == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
          next(); // To move to next middleware
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "You are Not Authorized"
          });
          return;
        }
      }
      else {
        // No user with this name exists respond back with a 401
        res.status(401);
        res.json({
          "status": 401,
          "message": "You are an Invalid User"
        });
        return;
      }

    }
    catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops! Something went Wrong!",
        "error": err
      });
    }
  }
  else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key...Try Again"
    });
    return;
  }
};
