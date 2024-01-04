If you need to change the email, you'll nee to change it in reservation.ts too (senderEmail)

TODO :
The table in the recap email doesn't work
Create a file with all modified infos (weekdays, senderEmail)
Adapt function to send email on certain weekdays from this array
Create a condition in handlebars when there are no additional pax to not show "👥 Nombre de participants: 1, dont"

Dans le mail récap pour denis : Possibilité de supprimer la réservation grâce à son ID
Pour enregistrer ou supprimer cette réservation :
Ouvre une page avec l'id de la réservation dans la query
(https://www.larga2.fr/confirm/id)
bouton "confirmer" : confirmed : true
bouton "refuser" : confirmed : false

si confirmer : page de validation s'affiche avec le texte "confirmé" pour l'envoi demail
si infirmé : page de validation s'affiche avec le texte "refuser" por l'envoi d'email
avec bouton copié/collé rapide

You need to send the ID of the reservation to the mail. You need to get it thanks to dataInfo with the last entry ?

1. SAVE 2. GET
