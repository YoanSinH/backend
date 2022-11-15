const express = require("express");

const {
  getDocuments,
  getDocument,
  insertDocument,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
} = require("../../controllers/mongoDB");
const { middlewareToken } = require("../../middleware/jwt.middleware");
const Users = require("../../models/Users");

const router = express.Router();

router.post("/usuarios", async (req, res) => {
  try {
    const userObject = req.body;
    userObject.create_by = req.user_logged.email;
    const user = new Users(userObject);
    const responseDB = await insertDocument(
      "hospital",
      "usuarios",
      user.initUser()
    );
    res.send({
      ok: true,
      message: "Usuario creado",
      info: responseDB,
    });
  } catch (err) {
    if (Object.keys(err).length > 0) {
      res.status(500).send(err);
    } else {
      res.status(500).send({
        ok: true,
        message: "ERROR: NO se pudo crear el usuario",
        info: err.toString(),
      });
    }
  }
});

router.get("/user/login", async (req, res) => {
  console.log(req.body.email);
  const email = req.body.email;
  const password = req.body.password;
  try {
    const responseDB = await getDocument("hospital", "users", email, password);
    console.log("res",responseDB);
    //const users = Users.removePassword(responseDB);
    if(responseDB == null){
      res.status(404).send({
        ok: false,
        message: "Usuario no encontrado",
        data: null,
      });
    }else{
    res.send({
      ok: true,
      message: "Usuario consultado",
      data: responseDB,
    });
  }
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "No se pudo consultar el usuario",
      info: err.toString(),
    });
  }
});

router.get("/usuarios/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const responseDB = await getDocumentById("hospital", "usuarios", id);
    delete responseDB.password;
    res.send({
      ok: true,
      message: "Usuario encontrado",
      info: responseDB,
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "No se pudo consultar el usuario",
      info: err.toString(),
    });
  }
});

router.put("/usuarios/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const userObject = req.body;
    const user = new Users(userObject);

    const responseDB = await updateDocumentById("hospital", "usuarios", {
      id,
      data: user.initUser(),
    });
    if (responseDB.modifiedCount > 0) {
      return res.status(200).send({
        ok: true,
        message: "Usuario actualizado.",
        info: userObject,
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "El usuario no existe.",
        info: "",
      });
    }
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "No se pudo actualizar el usuario",
      info: error.toString(),
    });
  }
});

router.delete("/usuarios/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const responseDB = await deleteDocumentById("hospital", "usuarios", id);
    if (responseDB.deletedCount === 1) {
      res.status(200).send({
        ok: true,
        message: "Usuario eliminado",
        info: "",
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "El usuario no existe.",
        info: responseDB,
      });
    }
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "Ha ocurrido un error eliminando el usuario.",
      info: err.toString(),
    });
  }
});

module.exports = router;
