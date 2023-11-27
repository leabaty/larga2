import LocalizedStrings from 'react-localization';

const lang = new LocalizedStrings({
  en: {
    messageInfo:
      "Une date non disponible dans le calendrier ? Une demande spécifique ? Un besoin d'information ? Un problème technique ? Une annulation ? N'hésitez pas à me contacter, je suis toute ouïe !",
  },

  fr: {
    messageInfo:
      "Une date non disponible dans le calendrier ? Une demande spécifique ? Un besoin d'information ? Un problème technique ? Une annulation ? N'hésitez pas à me contacter, je suis toute ouïe !",
  },
});

export const content = {
  messageInfo: lang.messageInfo,
};
