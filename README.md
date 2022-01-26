# Système de rooms

- Système en NodeJS pour signer des données (id en session)
- Premier panneau pour entrer un pseudo ET lancer une partie
- Comment on nettoie les partie ? 
  - Une partie finie est détruite
  - Limiter à 100 partie
  - Si le joueur est déjà dans une partie, lorsqu'il en recrée une il supprime l'ancienne
  - Une partie qui est sans joueur est supprimée
  - ??? Une partie qui a commencée depuis plus de 30 minutes est supprimée

- Quand un utilisateur arrive avec un lien ?gameId=12312321
  - On lui demande son pseudo (sauf si il a un pseudo dans l'url)
  - On le connecte au websocket
  - On lui fait rejoindre la partie 
  - Tout le monde est content


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
