## TODO

- Est-ce pertinent d'utiliser les SocketStream partout, un ID permettrait de simplifier les choses
- Mettre en place le choix du pseudo pour les joueurs
- Système de reconnection ? (persister l'ID)

## Historique

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
