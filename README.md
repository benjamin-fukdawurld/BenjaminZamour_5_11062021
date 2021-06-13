# BenjaminZamour_5_11062021

Projet n°5 de la formation OCR DW - Construisez un site e-commerce

## Get started

```
git clone ...
git submodule update --init # pull the backend

pushd JWDP5
npm i # install packages
popd
pushd orinoco
npm i # install packages
popd
pushd JWDP5
npm start # start backend
```

Then all you need to do is open `dist/index.html`

## TODO

- Tester l'API ✓
- Créer 4 pages
  - Une page de présentation des différents produits
    - Tous les produits devrons êtres présentés
  - Une page de description du produit
    - Cette page devra charger dynamiquement les informations sur le produits
    - Cette page devra afficher les informations concernant le produit dynamiquement
    - Cette page devra permettre à l'utilisateur de personnaliser le produit
    - Cette page devra permettre à l'utilisateur d'ajouter le produit au panier
  - Une page de panier
    - Le panier devra contenir une liste des produits avec leur prix
    - Le panier devra contenir que le prix total un formulaire permettant de passer commande
    - Le panier devra contrôler les information du formulaire de commande
  - Une page de confirmation
    - Cette page devra remercier le client pour sa commande
    - Elle devra également indiquer le prix total
    - La page devra également fournir l'identifiant de la commande
- Définir le plan de test
