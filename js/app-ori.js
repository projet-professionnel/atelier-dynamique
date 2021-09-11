/*
<div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
*/

//on cible l'élément dans lequel on va vouloir intégrer la grille
var container = document.getElementById('invader');

//afin de laisser à l'utilisateur la possibilité de choisir la taille de la grille et la taille de chaque pixel, on anticipe un peu et on stocke ces informations dans des variables
//Ainsi, on pourra plus facilement modifier leur valeur sans avoir à intervenir dans plein d'endroits de notre code
var gridSize = 8;
var pixelSize = 25;


var changeColor = function(clickEvent) {
    console.log(clickEvent);
    //event est un object fourni par JavaScript dans un callbackj de gestion d'événement
    //cet object contient une propriété target qui est une référence vers l'élément HTML concerné par l'évé"nement qui vient de se produire
    //on peut utiliser cette référence pour modifier l'élément HTML sans avoir à le resélectionner

    //je stocke l'élément qui vient dêtre cliqué dans une variable intermédiaire, lpus rapide à taper dans le reste du code
    var pixel = clickEvent.target;
    
    //SI mon élément a la class pixel--plain
    //ALORS je retire la class pixel--plain et je mets la class pixel--empty
    //SINON je retire la class pixel--empty et mets la class pixel--plain

    if (pixel.classList.contains('pixel--plain')) {
        pixel.classList.remove('pixel--plain');
        pixel.classList.add('pixel--empty');
    } else {
        pixel.classList.remove('pixel--empty');
        pixel.classList.add('pixel--plain');
    }
};


//syntaxe classique d'un fonction
//function drawBoard() {}

//Autre syntaxe possible, celle-ci sera plus facile à intégrer dans un object par la suite
var drawBoard = function() {
    //on crée la grille en découpant la structure en X lignes qui chacune vont contenir X pixels
    for (var lineIndex=0; lineIndex<gridSize; lineIndex++) {
        //créer une div ligne
        var line = document.createElement('div');
        //on lui attribue la class CSS
        line.className = 'line';
        //on profite d'avoir la div ligne disponible pour lui ajouter ses X pixels
        for (var columnIndex=0; columnIndex<gridSize; columnIndex++) {
            //créer une div pixel
            var pixel = document.createElement('div');
            //configuration de la div pixel avec une classe CSS pour le style qui ne changera pas
            pixel.className = 'pixel';
            //on utilise la propriété style pour les informations qui pourront varier selon la saisie de l'utilisateur
            pixel.style.width = `${pixelSize}px`;
            pixel.style.height = `${pixelSize}px`;
            //ajouter à la ligne en cours
            line.appendChild(pixel);

            //on profite de la logique de création de la grille qui nous donne accès à travers la variable pixel à une référence à chacune des cases de la grille
            //plutôt que de refaire une boucle, on ajoute directement l'écouteur d'événement à la création de chacune des cases
            // pixel.addEventListener('click', function(event) {
            //     console.log(event);
            //     console.log('J\'ai bien cliqué sur une case');
            // });
            pixel.addEventListener('click', changeColor);

        }
        //ajouter au container
        container.appendChild(line);
    }
};

drawBoard();

var resetBoard = function() {
    //on peut facilement vider le contenu d'un élément html en passant sa propriété textContent à chaine vide ('');
    container.textContent = '';
};

var handleSubmit = function(submitEvent) {
    //on empêche le comportement par défaut
    submitEvent.preventDefault();

    console.log(submitEvent);
    //on récupère la valeur saisie par l'utilisateur pour la taille de la grille

    var tailleGrille = submitEvent.target[0].value;

    //on teste la valeur contenue dans value pour être sûr qu'il s'agit bien d'un nombre avant de lancer la génération de la grille
    if (isNaN(tailleGrille) === false  && tailleGrille > 0) {
        //on met à jour la variable qui contient la taille de la grille et qui est utilisée dans la fonction de création de la grille
        gridSize = tailleGrille;

        //on efface la grille existante
        resetBoard();
        //on rappelle la fonction de création de la grille
        drawBoard();

    } else {
        alert('Faut saisir un nombre positif');
    }



};






//on peut utiliser document.querySelector pour cibler un élément html en fonction de ses informations CSS
//querySelector prend en argument un sélecteur CSS : si c'est valide dans un fichier css, ce sera accepté dans querySelector
//la fonction va nous retourner le 1er élement de la page qui matche avec ce sélecteur
var form = document.querySelector('.configuration');

//pour gérer la validation du formulaire, on place un EventListener sur le formulaire lui-même
//Ainsi, on va pouvoir empêcher le comportement par défaut au click sur le bouton (rechargement de la page) et à traver event.target, on aura accès au formulaire complet et donc aux inputs qu'il contiendra
form.addEventListener('submit', handleSubmit);


var fillForm = function() {
    //ajouter un input pour gérer la taille de la grille
    //créer un élement input
    var input = document.createElement('input');
    //le configure (placeholder, valeur par défaut ?)
    input.placeholder = 'Taille de la grille';

    //on ajoute un type number pour forcer l'utilisateur à bien saisir un nombre dans le champ
    input.type = 'number';



    //on termine par l'ajout de cet input au formulaire
    form.appendChild(input);


    //ajouter un bouton pour valider le formulaire
    var button = document.createElement('button');
    button.textContent = 'Valider';
    form.appendChild(button);


};

fillForm();