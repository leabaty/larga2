import LocalizedStrings from 'react-localization';

const lang = new LocalizedStrings({
  en: {
    messageInfo:
      "A date not available in the calendar? A specific request? A need for information? A technical problem? A cancellation? Don't hesitate to contact me, I'm all ears!",
  },

  fr: {
    messageInfo:
      "Une date non disponible dans le calendrier ? Une demande spécifique ? Un besoin d'information ? Un problème technique ? Une annulation ? N'hésitez pas à me contacter, je suis toute ouïe !",
  },
});

export const content = {
  messageInfo: lang.messageInfo,
};
