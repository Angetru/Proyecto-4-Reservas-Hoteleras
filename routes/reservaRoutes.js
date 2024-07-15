const express = require("express");
const router = express.Router();
const {createReserva, getReservas, getReserva, updateReserva, deleteReserva, filterReservasHotel, filterReservasFechas, filterReservasHabitacion, filterReservasEstado, filterReservasHuespedes} = require('../controllers/reservaController');

// CRUD Endpoints
router.post("/", createReserva);
router.get("/all", getReservas);
router.get("/:id", getReserva);
router.patch("/:id", updateReserva);
router.delete("/:id", deleteReserva);

// Filter Endpoint
router.get('/filter/hotel', filterReservasHotel);
router.get('/filter/fechas', filterReservasFechas);
router.get('/filter/habitacion', filterReservasHabitacion);
router.get('/filter/estado', filterReservasEstado);
router.get('/filter/huespedes', filterReservasHuespedes);

module.exports = router;
