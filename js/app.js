var app = {

    container: document.getElementById('invader'),
    form: document.querySelector('.configuration'),
    gridSize: 8,
    pixelSize: 25,
    
    changeColor: function(clickEvent) {
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
    },

    drawBoard: function() {
        //on crée la grille en découpant la structure en X lignes qui chacune vont contenir X pixels
        for (var lineIndex=0; lineIndex<app.gridSize; lineIndex++) {
            //créer une div ligne
            var line = document.createElement('div');
            //on lui attribue la class CSS
            line.className = 'line';
            //on profite d'avoir la div ligne disponible pour lui ajouter ses X pixels
            for (var columnIndex=0; columnIndex<app.gridSize; columnIndex++) {
                //créer une div pixel
                var pixel = document.createElement('div');
                //configuration de la div pixel avec une classe CSS pour le style qui ne changera pas
                pixel.className = 'pixel';
                //on utilise la propriété style pour les informations qui pourront varier selon la saisie de l'utilisateur
                pixel.style.width = `${app.pixelSize}px`;
                pixel.style.height = `${app.pixelSize}px`;
                //ajouter à la ligne en cours
                line.appendChild(pixel);
    
                //on profite de la logique de création de la grille qui nous donne accès à travers la variable pixel à une référence à chacune des cases de la grille
                //plutôt que de refaire une boucle, on ajoute directement l'écouteur d'événement à la création de chacune des cases
                // pixel.addEventListener('click', function(event) {
                //     console.log(event);
                //     console.log('J\'ai bien cliqué sur une case');
                // });
                pixel.addEventListener('click', app.changeColor);
    
            }
            //ajouter au container
            app.container.appendChild(line);
        }
    },
    
    resetBoard: function() {
        //on peut facilement vider le contenu d'un élément html en passant sa propriété textContent à chaine vide ('');
        app.container.textContent = '';
    },
      
    isValidValue: function(fieldValue) {
        if (isNaN(fieldValue) === false  && fieldValue > 0) {
            return true;
        }
        return false;

        //version condensée
        //return isNaN(fieldValue) === false && fieldValue > 0
    },

    handleSubmit: function(submitEvent) {
        //on empêche le comportement par défaut
        submitEvent.preventDefault();
    
        console.dir(submitEvent.target);

        //on récupère la valeur saisie par l'utilisateur pour la taille de la grille
        var tailleGrille = submitEvent.target[0].value;
    
        var taillePixel = submitEvent.target[1].value;

        //on teste la valeur contenue dans value pour être sûr qu'il s'agit bien d'un nombre avant de lancer la génération de la grille
        if (app.isValidValue(tailleGrille) && app.isValidValue(taillePixel)) {
            //on met à jour la variable qui contient la taille de la grille et qui est utilisée dans la fonction de création de la grille
            app.gridSize = tailleGrille;
    
            app.pixelSize = taillePixel;

            //on efface la grille existante
            app.resetBoard();
            //on rappelle la fonction de création de la grille
            app.drawBoard();
    
        } else {
            alert('Faut saisir un nombre positif');
        }
    },

    generateInput: function(placeholder) {
        var input = document.createElement('input');
        input.placeholder = placeholder;
        input.type = 'number';
        app.form.appendChild(input);
    },

    fillForm: function() {

        app.generateInput('Taille de la grille');
        app.generateInput('Taille des pixels');
    
        //ajouter un bouton pour valider le formulaire
        var button = document.createElement('button');
        button.textContent = 'Valider';
        app.form.appendChild(button);
    },

    init: function() {
        app.drawBoard();
        app.form.addEventListener('submit', app.handleSubmit);
        app.fillForm();
    }
    
};

app.init();