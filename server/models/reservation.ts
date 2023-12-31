import mongoose from 'mongoose';

const additionalPaxSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const reservationSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    additionalPax: [additionalPaxSchema],
    counter: Number,
    selectedDate: Date,
    requestDate: Date,
  },
  { collection: 'Reservation' }
);

const ReservationModel = mongoose.model('Reservation', reservationSchema);

export default ReservationModel;
