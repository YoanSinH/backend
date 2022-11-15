const { verifyToken } = require("../controllers/jwt");

const middlewareToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization ? authorization.replace("Bearer ", "") : null;
    const user = verifyToken(token);
    req.user_logged = user;
    next();
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "Error en la verificacion",
      info: err.toString(),
    });
  }
};

module.exports = { middlewareToken };
