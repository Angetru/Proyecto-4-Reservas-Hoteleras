const Reserva = require('../models/reservaModel');

//Inicializamos con data de reservas en array
const r1 = new Reserva(1, "Hotel Paraiso", "2024-07-10", "2024-07-20", "Single", 1, "Pagado", "Paul Gomez", "pgom@gmail.com");
const r2 = new Reserva(2, "Hotel Paraiso", "2024-11-19", "2024-11-25", "Triple", 3, "Pendiente", "Santiago Mendez", "sanmen@gmail.com");
const r3 = new Reserva(3, "Hotel Tropical", "2024-10-15", "2024-10-20", "Quintuple", 5, "Pagado", "Agustina Souza", "Agusouza@bbb.com");
const r4 = new Reserva(4, "Hotel Paraiso", "2024-08-12", "2024-08-15", "Lujo", 2, "Pagado", "Andrea Palacios", "Andrepal@bhp.com");

// Array para reservas, guardamos reservas declaradas en lineas 4 a linea 7
let reservas = [r1, r2, r3, r4];

//Crear una reserva, ejemplo como cliente
const createReserva = (req, res) => {
  const { hotel, fechaInicio, fechaFin, tipoHabitacion, numHuespedes, estado, nombre, email } = req.body;
  const newReserva = new Reserva(
    reservas.length + 1,
    hotel,
    fechaInicio,
    fechaFin,
    tipoHabitacion,
    numHuespedes,
    estado,
    nombre,
    email
  );
  //Agrega la nueva reserva al array
  reservas.push(newReserva);
  res.send({ok: true, description: '¡Reserva creada!', data: newReserva});
};

//Obtener todas las reservas, ejemplo como recepcionista
const getReservas = (req, res) => {
  res.send({ok: true, description: 'Listado de todas las reservas', data: reservas});
};

//Obtener una reserva específica por ID, ejemplo para recepcionista/gerente
const getReserva = (req, res) => {
  const reserva = reservas.find(r => r.id === parseInt(req.params.id));
  if (!reserva) {
    return res.send({ok: false, description: 'Reserva no encontrada'});
  }
  res.send({ok: true, description: 'Reserva encontrada', data: reserva});
};

//Actualizar una reserva
const updateReserva = (req, res) => {
  const { hotel, fechaInicio, fechaFin, tipoHabitacion, numHuespedes, estado, nombre, email } = req.body;
  const reservaIndex = reservas.findIndex(r => r.id === parseInt(req.params.id));

  if (reservaIndex === -1) {
    return res.send({ok: false, description: 'Reserva no encontrada'});
  }
  
  const reservaToUpdate = reservas[reservaIndex];
  const updatedReserva = {
    ...reservaToUpdate, // Mantiene los datos existentes
    ...(hotel !== undefined && { hotel }), // Actualiza hotel, si está presente en el body
    ...(fechaInicio !== undefined && { fechaInicio }),
    ...(fechaFin !== undefined && { fechaFin }),
    ...(tipoHabitacion !== undefined && { tipoHabitacion }),
    ...(numHuespedes !== undefined && { numHuespedes }),
    ...(estado !== undefined && { estado }),
    ...(nombre !== undefined && { nombre }),
    ...(email !== undefined && { email })
  };

  reservas[reservaIndex] = updatedReserva;
  res.send({ok: true, description: 'Reserva actualizada exitosamente', data: updatedReserva});
};

//Eliminar una reserva por ID
const deleteReserva = (req, res) => {
  const reservaIndex = reservas.findIndex(r => r.id === parseInt(req.params.id));

  if (reservaIndex === -1) {
    return res.send({ok: true, description: 'Reserva no encontrada'});
  }

  reservas.splice(reservaIndex, 1);
  res.send({ok: true, description: 'Reserva eliminada'});

};


//Filtrar por hotel, como gerente
const filterReservasHotel = (req, res) =>{
  const { hotel } = req.query;
  if (!hotel) {
    return res.send({ok: false, description: 'Parámetro hotel no proporcionado'});
  }
  const filteredReservas = reservas.filter(r => r.hotel === hotel);
  res.send({ok: true, description: 'Filtro de reservas por hotel exitoso', data: filteredReservas});
};
// Filtrar por rango de fechas, como gerente
const filterReservasFechas = (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  // Convertir las fechas de consulta a objetos Date
  const fechaInicioDate = new Date(fechaInicio);
  const fechaFinDate = new Date(fechaFin);

    // Verificar si las fechas son válidas
  if (isNaN(fechaInicioDate) || isNaN(fechaFinDate)) {
    return res.send({ ok: false, description: 'Formato de fecha no válido' });
  }
// Filtrar las reservas por fechas
const filteredReservas = reservas.filter(r => {
  const reservaInicio = new Date(r.fechaInicio);
  const reservaFin = new Date(r.fechaFin);
  return reservaInicio >= fechaInicioDate && reservaFin <= fechaFinDate;
});

// Enviar la respuesta con las reservas filtradas o un mensaje si no hay reservas
if (filteredReservas.length === 0) {
  return res.json({ ok: true, description: 'No hay reservas en el rango de fechas indicadas' });
}

  // Enviar la respuesta con las reservas filtradas
  res.send({ok: true, description: 'Filtro de reservas por rango de fechas exitoso', data: filteredReservas});
};

// Filtrar por tipo de habitación
const filterReservasHabitacion = (req, res) => {
  const { tipoHabitacion } = req.query;
  if (!tipoHabitacion) {
    return res.send({ok: false, description: 'Parámetro tipoHabitacion no proporcionado'});
  }
  const filteredReservas = reservas.filter(r => r.tipoHabitacion === tipoHabitacion);
  res.send({ok: true, description: 'Filtro de reservas por tipo de habitación exitoso', data: filteredReservas});
};

// Filtrar por estado
const filterReservasEstado = (req, res) => {
  const { estado } = req.query;
  if (!estado) {
    return res.send({ok: false, description: 'Parámetro estado no proporcionado'});
  }
  const filteredReservas = reservas.filter(r => r.estado === estado);
  res.send({ok: true, description: 'Filtro de reservas por estado exitoso', data: filteredReservas});
};

// Filtrar por número de huéspedes
const filterReservasHuespedes = (req, res) => {
  const { numHuespedes } = req.query;
  if (!numHuespedes) {
    return res.send({ok: false, description: 'Parámetro numHuespedes no proporcionado'});
  }
  const filteredReservas = reservas.filter(r => r.numHuespedes === parseInt(numHuespedes));
  res.send({ok: true, description: 'Filtro de reservas por número de huéspedes exitoso', data: filteredReservas});
};

module.exports = {
  createReserva, 
  getReservas, 
  getReserva, 
  updateReserva, 
  deleteReserva, 
  filterReservasHotel, 
  filterReservasFechas, 
  filterReservasEstado, 
  filterReservasHabitacion, 
  filterReservasHuespedes
};

