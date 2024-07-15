//Construye la BD como clase reserva

class Reserva{
    constructor(id, hotel, fechaInicio, fechaFin, tipoHabitacion, numHuespedes, estado, nombre, email){
        this.id = id;
        this.hotel = hotel;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.tipoHabitacion = tipoHabitacion;
        this.numHuespedes = numHuespedes;
        this.estado = estado;
        this.nombre = nombre;
        this.email = email;
    }
}

module.exports = Reserva;