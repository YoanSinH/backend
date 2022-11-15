const express = require("express");

const {
  getDocuments,
  insertDocument,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
} = require("../../controllers/mongoDB");
const { middlewareToken } = require("../../middleware/jwt.middleware");
const Medicines = require("../../models/Medicines");

const router = express.Router();

router.post("/medicina", middlewareToken, async (req, res) => {
  try {
    const medicineObject = req.body;
    const medicine = new Medicines(medicineObject);
    const responseDB = await insertDocument("hospital", "medicina", medicine);
    res.send({
      ok: true,
      message: "Medicia creada",
      info: responseDB,
    });
  } catch (err) {
    if (Object.keys(err).length > 0) {
      res.status(500).send(err);
    } else {
      res.status(500).send({
        ok: true,
        message: "ERROR: No se pudo crear la medicina",
        info: err.toString(),
      });
    }
  }
});

router.get("/medicina", async (req, res) => {
  try {
    const medicine = await getDocuments("hospital", "medicina");
    res.send({
      ok: true,
      message: "Medicina consultada",
      info: medicine,
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "ERROR: No se pudo consultar la medicina",
      info: err.toString(),
    });
  }
});

router.get("/medicina/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const medicine = await getDocumentById("hospital", "medicina", id);
    res.send({
      ok: true,
      message: "Medicina consultada por ID",
      info: medicine,
    });
  } catch (err) {
    res.status(500).send({
      ok: true,
      message: "ERROR: No se puede consultar la medicina solicitada",
      info: err.toString,
    });
  }
});

router.put("/medicina/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const medicine = req.body;
    const responseDB = await updateDocumentById("hospital", "medicina", {
      id,
      data: medicine,
    });
    if (responseDB.modifiedCount > 0) {
      return res.status(200).send({
        ok: true,
        message: "Medicina actualizada.",
        info: appointment,
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "La medicina no existe.",
        info: "",
      });
    }
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "ERROR: No se pueden actualizar la medicina",
      info: err.toString(),
    });
  }
});

router.delete("/medicina/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const respondeDB = await deleteDocumentById("hospital", "medicina", id);
    if (responseDB.deletedCount === 1) {
      res.status(200).send({
        ok: true,
        message: "Medicina eliminada",
        info: "",
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "La medicina no existe.",
        info: responseDB,
      });
    }
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "ERROR: No se pueden actualizar las medicinas",
      info: err.toString(),
    });
  }
});

module.exports = router;