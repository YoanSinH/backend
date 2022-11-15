const express = require("express");

const {
  getDocuments,
  insertDocument,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
} = require("../../controllers/mongoDB");
const { middlewareToken } = require("../../middleware/jwt.middleware");

const Appointment = require("../../models/Appointment");

const router = express.Router();

router.post("/citas", async (req, res) => {
  try {
    const appointmentObject = req.body;
    const appointment = new Appointment(appointmentObject);
    const responseDB = await insertDocument("hospital", "citas", appointment);
    res.send({
      ok: true,
      messages: "Cita Asignada",
      info: responseDB,
    });
  } catch (err) {
    if (Object.keys(err).length > 0) {
      res.status(500).send(err);
    } else {
      res.status(500).send({
        ok: true,
        message: "Cita NO asignada.",
        info: err.toString(),
      });
    }
  }
});

router.get("/citas", async (req, res) => {
  try {
    const appointment = await getDocuments("hospital", "citas");
    res.send({
      ok: true,
      message: "Citas consultadas",
      info: appointment,
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "ERROR: No se pueden consultar las citas",
      info: err.toString(),
    });
  }
});

router.get("/citas/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = await getDocumentById("hospital", "citas", id);
    res.send({
      ok: true,
      message: "Cita por id consultada",
      info: appointment,
    });
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "ERROR: No se pueden consultar las citas",
      info: err.toString(),
    });
  }
});

router.put("/citas/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const appointment = req.body;
    const responseDB = await updateDocumentById("hospital", "citas", {
      id,
      data: appointment,
    });
    if (responseDB.modifiedCount > 0) {
      return res.status(200).send({
        ok: true,
        message: "Cita actualizada.",
        info: appointment,
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "La cita no existe.",
        info: "",
      });
    }
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "ERROR: No se pueden actualizar las citas",
      info: err.toString(),
    });
  }
});

router.delete("/citas/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const responseDB = await deleteDocumentById("hospital", "citas", id);
    if (responseDB.deletedCount === 1) {
      res.status(200).send({
        ok: true,
        message: "Cita eliminada",
        info: "",
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "La cita no existe.",
        info: responseDB,
      });
    }
  } catch (err) {
    res.status(500).send({
      ok: false,
      message: "ERROR: No se pueden actualizar las citas",
      info: err.toString(),
    });
  }
});

module.exports = router;
