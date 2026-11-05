# TP1 - Tickets de maintenance

## Identité

- **Nom :** Aboubacar ABH
- **Groupe :** L2DSI1

## Description

Application Vue.js 3 permettant de consulter des tickets de support informatique
via une API REST simulée avec JSON Server. Chaque ticket contient un identifiant,
un titre, une description, un demandeur, une priorité, un statut et une date de
création.

## Prérequis

- Node.js et npm installés
- Un navigateur récent

## Installation

```bash
npm install
```

## Lancement

Deux terminaux doivent rester ouverts.

### Serveur JSON

```bash
npx json-server db.json --port 3000
```

L'API est disponible à l'adresse http://localhost:3000/tickets.

### Application Vue

```bash
npm run dev
```

Ouvrir ensuite l'adresse affichée par Vite, généralement
http://localhost:5173.

## Fonctionnalités réalisées

- Consultation des tickets via un service Axios
- Affichage du titre, du demandeur, de la priorité, du statut et de la date
- Chargement des données avec `ref()`, `onMounted()` et `async/await`
- Message « Chargement… » pendant la requête
- Message d'erreur si JSON Server n'est pas démarré
- Recherche par titre
- Filtrage par statut et par priorité
- Compteur de tickets visibles
- Message lorsqu'aucun ticket ne correspond aux critères

## Questions théoriques

### Quelle différence entre une API REST et le fichier `db.json` ?

Une API REST est une interface accessible par HTTP qui permet à une application
de lire ou de modifier des ressources avec des routes et des méthodes comme
`GET`, `POST`, `PUT` et `DELETE`. Le fichier `db.json` est seulement un fichier
local qui stocke les données. JSON Server utilise ce fichier pour simuler une
API REST et fournir des routes comme `/tickets`.

### Pourquoi utiliser `onMounted()` ?

`onMounted()` exécute une fonction lorsque le composant Vue est monté dans le
DOM. Il est donc adapté pour lancer le chargement initial des tickets une fois
que le composant est prêt.

### Quel est le rôle d'Axios ?

Axios est une bibliothèque qui simplifie les requêtes HTTP depuis JavaScript.
Dans cette application, elle est utilisée pour envoyer une requête `GET` à
`/tickets`, récupérer la réponse JSON et gérer les erreurs de communication.

### Quelle différence entre `ref()` et `computed()` ?

`ref()` crée une donnée réactive qui peut être modifiée, par exemple la liste
des tickets ou le texte de recherche. `computed()` crée une valeur calculée
à partir d'autres données réactives, par exemple la liste filtrée des tickets.
Elle est recalculée automatiquement lorsque ses dépendances changent.

## Difficultés rencontrées

- Comprendre la séparation entre le frontend Vue et le serveur JSON.
- Configurer JSON Server sur le port 3000 pour que l'URL utilisée par Axios
  soit accessible.
- Gérer correctement les états de chargement, d'erreur et de filtrage dans
  le composant Vue.
