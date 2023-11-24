import LocalizedStrings from 'react-localization';
import '../styles/Form.scss';

const lang = new LocalizedStrings({
  en: {
    title: 'Reservation',
    field: {
      firstname: 'First name',
      lastname: 'Last name',
      email: 'Email',
      phone: 'Phone number',
      date: 'Date',
      addpax: 'additional passenger(s)',
      add: 'add',
      remove: 'remove',
    },
    submit: 'Reservation request',
    error: {
      mandatory: 'This field is mandatory',
      email: 'Your email is incorrect or missing',
      phone: 'Your phone number is incorrect or missing',
      addpax: "If you don't need an additional passenger, please remove it",
    },
  },

  fr: {
    title: 'Réservation',
    field: {
      firstname: 'Prénom',
      lastname: 'Nom',
      email: 'E-mail',
      phone: 'Numéro de téléphone',
      date: 'Date',
      addpax: 'passager(s) supplémentaire(s)',
      add: 'ajouter',
      remove: 'supprimer',
    },
    submit: 'Demande de réservation',
    error: {
      mandatory: 'Ce champ est obligatoire',
      email: 'Votre e-mail est incorrect ou manquant',
      phone: 'Votre numéro de téléphone est incorrect ou manquant',
      addpax: "Si vous n'avez pas besoin d'un passager supplémentaire, veuillez le supprimer.",
    },
  },
});

export const content = {
  title: lang.title,
  field: {
    firstname: lang.field.firstname,
    lastname: lang.field.lastname,
    email: lang.field.email,
    phone: lang.field.phone,
    date: lang.field.date,
    addpax: lang.field.addpax,
    add: lang.field.add,
    remove: lang.field.remove,
  },
  submit: lang.submit,
  error: {
    mandatory: lang.error.mandatory,
    email: lang.error.email,
    phone: lang.error.phone,
    addpax: lang.error.addpax,
  },
};
