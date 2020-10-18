# INSTALLATION

#### DataBase

- Démarrer le serveur MySQL
- Créer une base de donnée "**groupomania**" ( ou n'importe quel autre nom, celui-ci sera renseigné dans _.env_ )
- Créer un utilisateur en notant bien son **nom**, son **mot de passe** et sa **clé secrête** ( cette dernière peut être identique au mot de passe )
- Créer un fichier **.env** dans le dossier _./backend_ et le renseigner avec les données précédentes au format suivant :

  HOST = localhost
  DATABASE = **groupomania**
  DB*USERNAME = **nom**
  DB_PASSWORD = **mot de passe**
  PORT = 3000
  SECRET_KEY = **clé secrête**
  ACCESS_TOKEN = **token** ( \_n'importe quel chaîne de caractère fera l'affaire, celle-ci sera utilisé par jwt* )

#### Backend

- Se positionner dans le dossier _./backend_
- Puis lancer la commande `npm install`
- Ensuite `nodemon server`
- Le message _"Connection has been established successfully."_ doit s'afficher dans la console ainsi que la creation de la _DB_

#### Frontend

- Se positionner dans le dossier _./frontend_
- Puis lancer la commande `npm install`
- Ensuite `npm run serve`
- Depuis le navigateur web, se rendre à l'adresse indiquée en local (par défaut: http://localhost:8080/)
