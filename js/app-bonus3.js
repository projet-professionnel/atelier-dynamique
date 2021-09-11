var app = {

    container: document.getElementById('invader'),
    form: document.querySelector('.configuration'),
    gridSize: 8,
    pixelSize: 25,
    //ajout d'une propriété listant les styles de couleur possibles
    styles: [
        'plain',
        'empty',
        'light',
        'highlight'
    ],
    //on crée une nouvelle propriété qui va contenir la couleur par défaut, la couleur utilisée au chargement dde la page sans qu'on ait touché à la palette
    chosenStyle: 'plain',
    
    changeColor: function(clickEvent) {
        var pixel = clickEvent.target;
        //on commence par supprimer toutes les classes modifiers de couleur de pixel sur le pixel cliqué
        for (var index=0; index<app.styles.length; index++) {
            pixel.classList.remove('pixel--'+app.styles[index]);
        }
        //on applique la class modifier de couleur en se servant de la couleur par défaut (éventuellement mise à jour lors du click sur un élément de la palette)
        pixel.classList.add('pixel--'+app.chosenStyle);
    },

    drawBoard: function() {
        for (var lineIndex=0; lineIndex<app.gridSize; lineIndex++) {
            var line = document.createElement('div');
            line.className = 'line';
            for (var columnIndex=0; columnIndex<app.gridSize; columnIndex++) {
                var pixel = document.createElement('div');
                pixel.className = 'pixel';
                pixel.style.width = `${app.pixelSize}px`;
                pixel.style.height = `${app.pixelSize}px`;
                line.appendChild(pixel);
                pixel.addEventListener('click', app.changeColor);
    
            }
            app.container.appendChild(line);
        }
    },
    
    resetBoard: function() {
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
        submitEvent.preventDefault();
    
        var tailleGrille = submitEvent.target[0].value;
        var taillePixel = submitEvent.target[1].value;

        if (app.isValidValue(tailleGrille) && app.isValidValue(taillePixel)) {
            app.gridSize = tailleGrille;
            app.pixelSize = taillePixel;
            app.resetBoard();
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
    
        var button = document.createElement('button');
        button.textContent = 'Valider';
        app.form.appendChild(button);
    },

    handleColorClick: function(event) {
        //on récupère l'élément qui possède la classe modifier active dans la palette ...
        var oldColorElement = document.querySelector('.palette__color--active');
        //et on lui retire le 'status' active
        oldColorElement.classList.remove('palette__color--active');

        //on se sert encore une fois de event.target pour cibler l'élément qui vient d'être cliqué dans la palette
        var newColorElement = event.target;
        //et on lui ajoute le 'status' active
        newColorElement.classList.add('palette__color--active');
        //on se sert de l'info custom stockée dans le dataset pour récupérer le style à appliquer
        var newColor = newColorElement.dataset.name;
        //et on met à jour la propriété qui stocke la couleur par défaut
        app.chosenStyle = newColor;
    },

    addStyle: function(style) {
        //création de l'élément
        var color = document.createElement('a');
        //pour le style, on applique une classe commune et une classe modifier qui va gérer la couleur
        color.className = 'palette__color palette__color--'+style;
        //on compare le style en cours à la couleur par défaut pour déterminer quelle est la couleur active
        if (style === app.chosenStyle) {
            color.classList.add('palette__color--active');
        }
        //on stocke l'information du style dans la balise HTML directement
        //pour éviter d'entrer en conflit avec des attributs existants, on utilise la propriété dataset qui permet de stocker des infos custom sans effet sur l'affichage dans le navigateur
        color.dataset.name = style;
        //on ajoute un listener sur le click
        color.addEventListener('click', app.handleColorClick);
        //on ajoute la balise <a> configurée à la div app.palette
        app.palette.appendChild(color);
    },

    addPalette: function() {
        //on crée une nouvelle div que l'on stocke comme propriété de notre object app
        app.palette = document.createElement('div');
        app.palette.className = 'palette';
        //on place à l'intérieur une balise <a> par style disponible
        for (var index=0; index<app.styles.length; index++) {
            //on délègue la création de cette balise <a> à une méthode
            app.addStyle(app.styles[index]);
        }
        document.body.appendChild(app.palette);
    },


    init: function() {
        app.drawBoard();
        app.form.addEventListener('submit', app.handleSubmit);
        app.fillForm();
        //on crée la palette dans le DOM
        app.addPalette();
    }
    
};

app.init();