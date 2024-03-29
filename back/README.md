## Mythomania P7

Backend du projet Mythomania

### Technologies utilisées

- Node.js, Express, JWT, Multer
- MySQL hébergé sur PlanetScale
- Prisma pour ORM

### Comment utiliser

1. `git clone` 
2. `npm install`
3. Renommez le fichier `.env.development` en `.env`
4. Remplissez-le avec vos variables d'environnement personnelles
5. Ce projet a été réalisé avec une base de données MySQL PlanetScale en ligne
6. Il faut donc créer un compte PlanetScale, créer une nouvelle base de données
7. Pour connecter la base de données au back, récuperer l'URL donnée par PlanetScale et la placer dans le fichier `.env`
8. Pour lancer le script `npm run dev`

### Comment utiliser Prisma pour interagir avec la base de données

Le schéma db est à l'intérieur du `schema.prisma`

Si vous voulez le changer, vous devez exécuter `npx prisma db push`