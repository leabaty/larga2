import LocalizedStrings from 'react-localization';
import '../styles/Form.scss';

const lang = new LocalizedStrings({
  en: {
    reservationTitle: 'Reservation',
    contactTitle: 'Contact',
    available: 'Available spots',
    field: {
      firstname: 'First name',
      lastname: 'Last name',
      email: 'Email',
      phone: 'Phone number',
      date: 'Date',
      pax: 'passenger(s)',
      add: 'add',
      remove: 'remove',
      message: 'Write your question or comment here!',
    },
    submit: {
      submitReservation: 'Submit Reservation Request',
      submittedReservation: 'Thank you for your request. I will get back to you within the next 48 hours to confirm!',
      submitContact: 'Send my message',
      submittedContact: 'Thank you for your message. I will get back to you as soon as possible.',
    },
    error: {
      mandatory: 'This field is mandatory',
      email: 'Please enter a valid email, as xxxx@xxxx.xx',
      phone: 'Please enter a valid phone number, as 0612345678 or 0033612345678',
      addpax: "If you don't need an additional passenger, please remove it",
    },
  },

  fr: {
    reservationTitle: 'Réservation',
    contactTitle: 'Contact',
    available: 'Places disponibles',
    field: {
      firstname: 'Prénom',
      lastname: 'Nom',
      email: 'E-mail',
      phone: 'Numéro de téléphone',
      date: 'Date',
      pax: 'passager(s)',
      add: 'ajouter',
      remove: 'supprimer',
      message: 'Ecrivez ici votre question ou remarque !',
    },
    submit: {
      submitReservation: 'Demande de réservation',
      submittedReservation: 'Merci pour votre demande, je reviendrai vers vous dans les prochaines 48h afin de la confirmer !',
      submitContact: 'Envoyer mon message',
      submittedContact: 'Merci pour votre message, je reviendrai vers vous dès que possible.',
    },

    error: {
      mandatory: 'Ce champ est obligatoire',
      email: 'Merci de rentrer un email au format xxxx@xxxx.xx',
      phone: 'Merci de rentrer un numéro de téléphone au format 0612345678 ou 0033612345678',
      addpax: "Si vous n'avez pas besoin d'un passager supplémentaire, veuillez le supprimer.",
    },
  },
});

export const content = {
  reservationTitle: lang.reservationTitle,
  contactTitle: lang.contactTitle,
  available: lang.available,
  field: {
    firstname: lang.field.firstname,
    lastname: lang.field.lastname,
    email: lang.field.email,
    phone: lang.field.phone,
    date: lang.field.date,
    addpax: lang.field.pax,
    add: lang.field.add,
    remove: lang.field.remove,
    message: lang.field.message,
  },
  submittedContact: lang.submit.submittedContact,
  submittedReservation: lang.submit.submittedReservation,
  submitContact: lang.submit.submitContact,
  submitReservation: lang.submit.submitReservation,
  error: {
    mandatory: lang.error.mandatory,
    email: lang.error.email,
    phone: lang.error.phone,
    addpax: lang.error.addpax,
  },
};
