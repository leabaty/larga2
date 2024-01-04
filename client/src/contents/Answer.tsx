import LocalizedStrings from 'react-localization';

const lang = new LocalizedStrings({
  en: {
    title: 'Answer a Request',
    info: 'You can now confirm or reject the outing request. An email will be automatically sent to the person who initiated the request.',
    warning: 'Attention, if you reject the request, it will be deleted, and there is no going back!',
    recap: 'Request Summary: ',
    confirm: 'Confirm',
    cancel: 'Cancel',
    exit: 'Thank you for your response. An email has been sent to the person who initiated this request with your choice. You can now close this window.',
  },

  fr: {
    title: 'Répondre à une demande',
    info: "Tu peux maintenant confirmer ou refuser la demande de sortie. Un mail sera envoyé automatiquement à la personne qui est à l'origine de la demande.",
    warning: "Attention, si tu refuses la demande, elle sera supprimée et aucun retour en arrière n'est possible !.",
    recap: 'Récapitulatif de la demande : ',
    confirm: 'confirmer',
    cancel: 'refuser',
    exit: "Merci pour ta réponse. Un mail a été envoyé à la personne à l'origine de cette demande avec ton choix, tu peux maintenant fermer cette fenêtre.",
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
};
