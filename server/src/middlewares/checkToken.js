const jwt = require('jsonwebtoken');

module.exports = function checkToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Token must have 2 parts' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' });
  }

  jwt.verify(token, 'token_secreto!', (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Invalid token' });
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    return next();
  });
}