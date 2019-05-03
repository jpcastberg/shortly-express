const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  const { shortlyid } = req.cookies;
  return models.Sessions.get({ hash: shortlyid })
    .then((sessionData) => {
      if (sessionData) {
        req.session = sessionData;
        next();
      } else {
        models.Sessions.create()
          .then((response) => {
            const id = response.insertId;
            return models.Sessions.get({id});
          })
          .then((newSessionData) => {
            req.session = newSessionData;
            req.cookies.shortlyid = newSessionData.hash;
            res.cookie('shortlyid', newSessionData.hash);
            next();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

