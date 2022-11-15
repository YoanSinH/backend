const jwt = require("jsonwebtoken");

const SECRET_KEY = "766dd134acc8297a392490e4cc67e86d37954bc3";

const createJsonWebToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: 60 });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error("Error al verificar token de seguridad")
    }
}

module.exports = {createJsonWebToken, verifyToken}