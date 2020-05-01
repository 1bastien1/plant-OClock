# Plant-OClock

Chaque semis demande une attention particulière : 
Plant'OClock est une application mobile (Android) en react-native qui permet de s'abonner à des fruits & légumes
puis d'ajouter dans votre agenda un évènement lié aux dates de début et fin de semis de ce légume. Deux évènements sont créés, 
un qui correspond à la date du début des semis, l'autre qui correspond à la date de fin des semis. 
Chaque événement dans le calendrier est accompagné de son alarme (et donc de sa notification 15 mn avant la date de semis)
et ceci afin de vous rappeler la date des semis.

## TODO list

aucune tâche en cours

## Contexte : 

Développée lors du confinement pendant la crise du Covid-19, cette application à avant tout comme but de répondre à un besoin personnel : être averti de la saison des semis et des températures trop fraiches qui risquent d'endommager les semis afin de prévoir une action adéquate. Face à l'engouement qu'elle a suscité à travers plusieurs groupes de discussion j'ai décidé de rendre disponible les sources mais également à terme de la rendre disponible sur le Google PlayStore™.

Plusieurs choix techniques ont été faits, surtout pour une première release rapide :


- l'utilisation de la bibliothèque [material-ui](https://github.com/mui-org/material-ui) - librairie graphique

Un système de notification push nécessite un backend et par manque de temps celui-ci n'est pas opérationnel.

Un [Système d'ajout d'évènement dans l'agenda local](https://github.com/wmcmahan/react-native-calendar-events) à permit de contrer cette problématique en ajoutant des événements dans Google Agenda avec une alarme qui fait office de notification



### Setup

```
- git clone https://github.com/1bastien1/plant-OClock
```
```
- Brancher votre téléphone androîd ou lancer un émulateur
```
```
- npm run-android
```
```
- npm start
```


### Features éventuelles à venir


- l'ajout de ses propres légumes avec sa photo.
- L'ajout de la localisation notamment pour ajouter une notification dans le cas ou le temps ne permet pas de garder
les semis dehors et donc nécessite de les rentrer.
- utilisation d'un backend (API) aussi bien pour le stockage des légumes que pour le lancement de notification
- remplacer l'événement dans l'agenda par une notification de l'application directement.
- mettre en place un plan de son potager sous forme de carré (1 carré = 1 plante)
- page conseille amenant vers des liens sur des conseils jardinage (comment semer, comment planter, ..)
- une page récapitulative avec des données météo lié à votre position. -> DONE


