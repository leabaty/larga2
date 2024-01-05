import mongoose from 'mongoose';

const additionalPaxSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const bookingSchema = new mongoose.Schema(
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
  { collection: 'Booking' }
);

const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;
