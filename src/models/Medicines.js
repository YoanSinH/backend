class Medicines {
  constructor({
    medicineID,
    code,
    brand,
    dose,
    amount,
    presentation,
    type,
    stock,
  }) {
    this.medicineID = medicineID;
    this.code = code;
    this.brand = brand;
    this.dose = dose;
    this.amount = amount;
    this.presentation = presentation;
    this.type = type;
    this.stock = stock;
  }
}

module.exports = Medicines;
