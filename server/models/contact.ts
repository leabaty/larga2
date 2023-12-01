import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    firstname: String,
    lastName: String,
    email: String,
    phone: String,
    message: String,
    requestDate: Date,
  },
  { collection: 'Contact' }
);

const ContactModel = mongoose.model('Contact', contactSchema);

export default ContactModel;
