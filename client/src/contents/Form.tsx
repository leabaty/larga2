import LocalizedStrings from 'react-localization';
import '../styles/Form.scss';

const lang = new LocalizedStrings({
  en: {
    reservationTitle: 'Reservation',
    contactTitle: 'Contact',
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
    submit: 'Reservation request',
    submitMessage: 'Thank you for your request. It will be confirmed via email in the next 48h.',
    error: {
      mandatory: 'This field is mandatory',
      email: 'Your email is incorrect or missing',
      phone: 'Your phone number is incorrect or missing',
      addpax: "If you don't need an additional passenger, please remove it",
    },
  },

  fr: {
    reservationTitle: 'Réservation',
    contactTitle: 'Contact',
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
    submit: 'Demande de réservation',
    submitMessage: 'Merci pour votre demande, je reviendrai vers vous dans les prochaines 48h afin de la confirmer !',
    error: {
      mandatory: 'Ce champ est obligatoire',
      email: 'Votre e-mail est incorrect ou manquant',
      phone: 'Votre numéro de téléphone est incorrect ou manquant',
      addpax: "Si vous n'avez pas besoin d'un passager supplémentaire, veuillez le supprimer.",
    },
  },
});

export const content = {
  reservationTitle: lang.reservationTitle,
  contactTitle: lang.contactTitle,
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
  submit: lang.submit,
  submitMessage: lang.submitMessage,
  error: {
    mandatory: lang.error.mandatory,
    email: lang.error.email,
    phone: lang.error.phone,
    addpax: lang.error.addpax,
  },
};
