## TODO

- Mettre en place le choix du pseudo pour les joueurs
- Système de reconnection ? (signer l'ID)
- Auto focus du champs pour entrer un mot
- Afficher le dessin et le mot deviné en cas de succès
- Afficher le dessin et le mot à faire deviner en cas d'échec
- Système de kick pour l'administrateur
- Afficher le nom devant la personne qui a déviné
- Mode spectateur qui peut ajouter des mots
- Scoreboard
- Ne pas prendre en compte les caractères spéciaux (éàç)
- Interaction twitch
  - Le tchat rajoute des mots
  - Système à un joueur avec tchat qui devine (connecté au tchat ?)
- Imaginer un design

## Historique

### 18/01/2022, 3h00

- Formulaire pour entrer les mots
- Etat de succès 
- Gestion des scores
- Sélection des mots aléatoirement
- Mise en place des timers
- Test en live

### 16/01/2022, 3h00

- Refactor des fichiers de la machine (nommage plus clair)
- Remplacement du système d'équipe
- Création de la phase de choix de mot
- Creation de la phase de dessin (via SVG)

### 15/01/2022, 2h30

- Refactor de la machine pour de meilleur types
- Simplification de la communication client / serveur
- Persistence de l'état
- Reconnexion des utilisateurs

### 12/01/2022, 2h00

- Mise en place de la structure front
- Communication avec les websockets
- Structure du passage de messages

### 11/01/2022, 2h19

- Mise en place de TSNode
- Mise en place (simple) de fastify et test des Websockets
- Mise en place de la machine à état via XState
