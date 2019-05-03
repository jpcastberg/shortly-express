const parseCookies = (req, res, next) => {
  const cookiesObj = {};
  if (req.headers.cookie) {
    const splitCookies = req.headers.cookie.split(';');
    splitCookies.reduce((obj, cookie) => {
      const splitCookie = cookie.split('=');
      const key = splitCookie[0].trim();
      const value = splitCookie[1].trim();
      obj[key] = value;
      return obj;
    }, cookiesObj);
  }
  req.cookies = cookiesObj;
  next();
};

module.exports = parseCookies;