import LocalizedStrings from 'react-localization';

const lang = new LocalizedStrings({
  en: {
    title: 'Answer a Request',
    info: 'You can now confirm or cancel the request. An email will be automatically sent to the person who initiated the request.',
    warning: 'Warning : if you cancel the request, it will be deleted, and there is no going back!',
    recap: 'Request Summary: ',
    confirm: 'Confirm',
    cancel: 'Cancel',
    exit: 'Thank you for your answer. An email has been sent to the person who initiated this request with your choice. You can now close this window.',
    undefinedMessage: 'The booking Id could not be found. It may already have been cancelled or it does not exist.',
  },

  fr: {
    title: 'Répondre à une demande',
    info: "Tu peux maintenant confirmer ou refuser la demande de sortie. Un mail sera envoyé automatiquement à la personne qui est à l'origine de la demande.",
    warning: "Attention, si tu refuses la demande, elle sera supprimée et aucun retour en arrière n'est possible !.",
    recap: 'Récapitulatif de la demande : ',
    confirm: 'confirmer',
    cancel: 'refuser',
    exit: "Merci pour ta réponse. Un mail a été envoyé à la personne à l'origine de cette demande avec ton choix, tu peux maintenant fermer cette fenêtre.",
    undefinedMessage: "Le numéro de réservation n'a pas pu être trouvé. Peut-être a t-il déjà été supprimé, ou il n'existe pas.",
  },
});

export const content = {
  title: lang.title,
  info: lang.info,
  warning: lang.warning,
  recap: lang.recap,
  confirm: lang.confirm,
  cancel: lang.cancel,
  exit: lang.exit,
  undefinedMessage: lang.undefinedMessage,
};
