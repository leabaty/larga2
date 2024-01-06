import LocalizedStrings from 'react-localization';
import '../styles/Form.scss';

const lang = new LocalizedStrings({
  en: {
    bookingTitle: 'Booking',
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
      message: 'Write your question or comment here',
    },
    submit: {
      submitBooking: 'Submit Booking Request',
      submittedBooking: 'Thank you for your request. I will get back to you within the next 48 hours to confirm.',
      submitContact: 'Send my message',
      submittedContact: 'Thank you for your message. I will get back to you as soon as possible.',
    },
    error: {
      mandatory: 'This field is mandatory',
      email: 'Please enter a valid email, as xxxx@xxxx.xx',
      phone: 'Please enter a valid phone number, as 0612345678 or 0033612345678',
      addpax: "If you don't need an additional passenger, please remove it",
      terms: 'You must agree to the terms.',
    },
    terms: "I understand that this request will be confirmed in the next 48h. For our safety, all outings will be based on the day's weather report. Depending on the weather conditions, the captain may postpone the navigation or propose a non-stop navigation.",
  },

  fr: {
    bookingTitle: 'Réservation',
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
      message: 'Ecrivez ici votre question ou remarque',
    },
    submit: {
      submitBooking: 'Demande de réservation',
      submittedBooking: 'Merci pour votre demande, je reviendrai vers vous dans les prochaines 48h afin de la confirmer.',
      submitContact: 'Envoyer mon message',
      submittedContact: 'Merci pour votre message, je reviendrai vers vous dès que possible.',
    },

    error: {
      mandatory: 'Ce champ est obligatoire',
      email: 'Merci de rentrer un email au format xxxx@xxxx.xx',
      phone: 'Merci de rentrer un numéro de téléphone au format 0612345678 ou 0033612345678',
      addpax: "Si vous n'avez pas besoin d'un passager supplémentaire, veuillez le supprimer.",
      terms: 'Merci de cocher cette case.',
    },
    terms: "Je comprends que ma demande de réservation est sujette aux disponibilités et me sera confirmée d'ici 48h. Pour notre sécurité, toutes les sorties seront basées sur le bulletin météo du jour. Selon les conditions météorologiques, le capitaine peut reporter la navigation ou proposer une navigation sans escale.",
  },
});

export const content = {
  bookingTitle: lang.bookingTitle,
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
  submittedBooking: lang.submit.submittedBooking,
  submitContact: lang.submit.submitContact,
  submitBooking: lang.submit.submitBooking,
  error: {
    mandatory: lang.error.mandatory,
    email: lang.error.email,
    phone: lang.error.phone,
    addpax: lang.error.addpax,
    terms: lang.error.terms,
  },
  terms: lang.terms,
};
