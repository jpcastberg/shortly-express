const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.cookies.shortlyid) {
    const { shortlyid } = req.cookies;
    models.Sessions.get({hash: shortlyid})
      .then((sessionData) => {
        if (sessionData) {
          req.session = sessionData;
          next();
        }
      })
      .catch((err) => {
        console.error(error);
        next();
      });
  } else {
    models.Sessions.create()
      .then((response) => {
        const id = response.insertId;
        return models.Sessions.get({id});
      })
      .then((newSessionData) => {
        req.session = newSessionData;
        res.cookie('shortlyid', newSessionData.hash);
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

