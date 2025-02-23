# Script Raifinder - Tampermonkey

## Description

**Script Raifinder** est un script Tampermonkey conçu pour le jeu [Opérateur 112](https://www.operateur112.fr/). Il permet d'identifier et de mettre en évidence la régulation d'alerte et d'intervention (RAI) la plus pertinente en fonction du nom de la mission.

## Fonctionnalités

- Analyse le titre de la mission en cours.
- Compare le titre avec les différentes RAI disponibles.
- Met en évidence la RAI la plus pertinente.
- Met en gras les caractères correspondants dans les RAI.
- Change la couleur de la RAI la plus pertinente pour la rendre plus visible.
- Active automatiquement l'onglet correspondant à la RAI sélectionnée.

## Installation

1. Installer l'extension [Tampermonkey](https://www.tampermonkey.net/) sur votre navigateur.
2. Ouvrir Tampermonkey et ajouter un nouveau script.
3. Copier et coller le contenu du fichier `script-raifinder.user.js`.
4. Sauvegarder et activer le script.
5. Recharger la page du jeu [Opérateur 112](https://www.operateur112.fr/).

## Configuration

Le script permet de personnaliser l'affichage de la RAI la plus pertinente en modifiant la constante `mostRevelentStyles` dans le fichier `script-raifinder.user.js`.

Exemple de modification des styles :
```javascript
const mostRevelentStyles = {
    fontSize: "1.5em",
    color: "blue",
    fontWeight: "bold"
};
```

Vous pouvez ajuster ces styles selon vos préférences pour améliorer la visibilité de la RAI la plus pertinente.

## Utilisation

- Lorsqu'une mission s'affiche, le script identifie la RAI la plus pertinente et la met en évidence en rouge. (Configuration par défaut)
- Les lettres correspondantes sont mises en gras pour une meilleure lisibilité.
- Si la RAI appartient à un onglet spécifique, l'onglet est automatiquement sélectionné.

## Auteur

- **Thunlos**

## Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, de le modifier et de le partager.

---

### Remarque

Ce script est en développement et peut être sujet à des améliorations futures. N'hésitez pas à proposer des suggestions ou des améliorations !

