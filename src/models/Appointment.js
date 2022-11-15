class Appointment {
  static createAppointmentFromObject(data) {
    if (!data.id) {
      throw { ok: false, message: "Id obligatorio" };
    }
    return new Appointment(data);
  }

  constructor({
    appointmentID,
    doctor,
    pacient,
    medicaments,
    date,
    generalInformation,
    medicalHistory
  }) {
    this.appointmentID = appointmentID;
    this.doctor = doctor;
    this.pacient = pacient;
    this.medicaments = medicaments;
    this.date = date;
    this.generalInformation = generalInformation;
    this.medicalHistory = medicalHistory;
  }
}

module.exports = Appointment;
