// PrivacyPolicyContent.js
import LocalizedStrings from 'react-localization';

const websiteURL = 'www.larga2.fr';
const websiteEmail = 'sorties.larga2@gmail.com';
const admins = 'Léa Baty, Denis Stampardo';

//TODO If new website : change here dataCollection !

const lang = new LocalizedStrings({
  en: {
    title: 'Privacy Policy',
    intro: `This Privacy Policy applies to the website: ${websiteURL}. It describes our procedures regarding the collection, use, and disclosure of your personal data when you use our website. For this, we inform you about:`,
    paragraphs: [
      `How personal data is collected and processed. Personal data includes information that can identify a user, such as first and last name, email address, phone, and user location.`,
      `User rights regarding this data.`,
      `The entity responsible for processing the collected and processed personal data.`,
      `To whom this data is transmitted.`,
      `The site's policy regarding "cookie" files.`,
    ],
    usage: `We use your personal data to provide and improve our services. By visiting  ${websiteURL}, you agree to the collection and use of information in accordance with this Privacy Policy. The collected data is stored in a computerized file and will only be communicated to the following recipients: ${admins}. This data will be processed.`,
    access: `You will have the right to access, rectify, request modification and deletion, and exercise your right to limit processing. You can exercise these rights at any time by contacting the data controller by email at: ${websiteEmail}`,
    withdraw: `You can also withdraw your consent to the processing of your data at any time or object to the processing of your data. You can also exercise the right to portability of your personal data.`,
    complaint: `If, after contacting our service, you find that your "Computer and Freedom" rights are not respected, you can file a complaint with the National Commission for Informatics and Liberties (CNIL), 3 Places de Fontenoy, 75007 Paris.`,
    dataCollectionTitle: 'Collection and Use of Your Personal Data',
    dataCollection: `Types of data collected: Name, first name, email address, phone. Other collected data may include information such as the type of browser, browser version, pages of our service that you visit, the time and date of your visit, the time spent on these pages, unique device identifiers, and other diagnostic data.`,
    mobileDeviceInfo: `When you access the service through or via a mobile device, we may automatically collect certain information, including, but not limited to, the type of mobile device you are using, the unique identifier of your mobile device, your mobile operating system, the type of mobile internet browser you are using, unique device identifiers, and other diagnostic data. We may also collect information that your browser sends whenever you visit our service or when you access the service through or via a mobile device.`,
    trackingTechnologies: 'Tracking Technologies and Cookies',
    cookieUsage: `We use Cookies to track the activity and evolution of our services. You can ask your browser to refuse all cookies or to indicate when a cookie is sent.`,
    noCookies: `We do not use cookies.`,
  },
  fr: {
    title: 'Politique de confidentialité',
    intro: `Cette Politique de confidentialité s’applique au site : ${websiteURL}. Elle décrit nos procédures sur la collecte, l’utilisation et la diffusion de vos données personnelles lorsque vous utilisez notre site internet. Pour cela, nous vous informons à propos de :`,
    paragraphs: [
      `La manière dont sont collectées et traitées les données à caractère personnel. Doivent être considérées comme données personnelles toutes les données étant susceptibles d’identifier un utilisateur. Il s’agit notamment du prénom et du nom, de l’âge, de l’adresse postale, l’adresse mail, la localisation de l’utilisateur.`,
      `Quels sont les droits des utilisateurs concernant ces données ;`,
      `Qui est responsable du traitement des données à caractère personnel collectées et traitées ;`,
      `À qui ces données sont transmises ;`,
      `La politique du site en matière de fichiers « cookies »`,
    ],
    usage: `Nous utilisons vos données personnelles pour fournir et améliorer nos services. En vous rendant sur ${websiteURL}, vous acceptez la collecte et l’utilisation des informations conformément à la présente Politique de confidentialité. Les données collectées sont sauvegardées dans un fichier informatisé. Les renseignements rassemblés seront communiqués aux seuls destinataires suivants : ${admins}. Ces données feront l’objet de traitement.`,
    access: `Vous garderez un droit de regard sur vos informations. Vous pourriez y accéder, les rectifier, demander leur modification et suppression et exercer votre droit à la limitation du traitement. Vous pourrez exercer ces droits à tout moment. Pour cela, vous pouvez contacter la responsable du traitement de données par mail à : ${websiteEmail}`,
    withdraw: `Aussi, vous pouvez retirer votre consentement au traitement de vos données à tout moment ou vous opposer au traitement de vos données. Vous pouvez également exercer un droit à la portabilité sur vos données personnelles.`,
    complaint: `Si après avoir contacté notre service, vous constatez que vos droits « Informatiques et Libertés » ne sont pas respectés, vous pourrez adresser une réclamation à la Commission nationale de l’Informatique et des Libertés ou CNIL, 3 Places de Fontenoy, 75007 Paris.`,
    dataCollectionTitle: 'Collecte et utilisation de vos données personnelles',
    dataCollection: `Types de données collectées : Nom, prénom, adresse électronique et numéro de téléphone. Les autres données collectées peuvent inclure des informations telles que le type de navigateur, la version du navigateur, les pages de notre service que vous visitez, l’heure et la date de votre visite, le temps passé sur ces pages, les identifiants uniques des appareils et d’autres données de diagnostic.`,
    mobileDeviceInfo: `Lorsque vous accédez au service par ou via un appareil mobile, nous pouvons recueillir automatiquement certaines informations, y compris, mais sans s’y limiter, le type d’appareil mobile que vous utilisez, l’identifiant unique de votre appareil mobile, votre système d’exploitation mobile, le type de navigateur Internet mobile que vous utilisez, les identifiants uniques des appareils et d’autres données de diagnostic. Nous pouvons également collecter les informations que votre navigateur envoie chaque fois que vous visitez notre service ou lorsque vous accédez au service par ou via un appareil mobile.`,
    trackingTechnologies: 'Technologies de suivi et cookies',
    cookieUsage: `Nous utilisons des Cookies pour suivre l’activité et l’évolution de nos services. Vous pouvez demander à votre navigateur de refuser tous les cookies ou d’indiquer quand un cookie est envoyé.`,
    noCookies: `Nous n'utilisons pas de cookies.`,
  },
});

export const content = {
  title: lang.title,
  intro: lang.intro,
  paragraphs: lang.paragraphs,
  usage: lang.usage,
  access: lang.access,
  withdraw: lang.withdraw,
  complaint: lang.complaint,
  dataCollectionTitle: lang.dataCollectionTitle,
  dataCollection: lang.dataCollection,
  mobileDeviceInfo: lang.mobileDeviceInfo,
  trackingTechnologies: lang.trackingTechnologies,
  cookieUsage: lang.cookieUsage,
  noCookies: lang.noCookies,
};
