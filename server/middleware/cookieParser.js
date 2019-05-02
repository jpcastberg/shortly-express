const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    const splitCookies = req.headers.cookie.split(';');
    const cookiesObj = splitCookies.reduce((obj, cookie) => {
      const splitCookie = cookie.split('=');
      const key = splitCookie[0].trim();
      const value = splitCookie[1].trim();
      obj[key] = value;
      return obj;
    }, {});
    req.cookies = cookiesObj;
  }
  next();
};

module.exports = parseCookies;