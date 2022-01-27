## TODO

- Signer l'ID
- Ban dès le lobby
- Limiter la taille des pseudos
- Joueur déconnecté avec une couleur
- Afficher un message en cas de kick
- Limiter les devinages dans le temps (5 secondes)
- Mode spectateur qui peut ajouter des mots
- Interaction twitch
  - Le tchat rajoute des mots
  - Système à un joueur avec tchat qui devine (connecté au tchat ?)
- Supprimer le dernier trait avec un CTRL+Z
- Kick après 10 secondes sans lignes
- Impossible de deviner tant que 0 lignes
- Mobile ?

## Historique

### 22/01/2022, 3h30

- Intégration de la maquette pour l'écran de devinage
- Création de quelques composants génériques (bouton, bouton avec icone...)
- Système de ban utilisateur

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
