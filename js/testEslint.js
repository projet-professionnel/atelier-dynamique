//cette instruction désactive une règle sur tout le fichier
/* eslint-disable indent */
var test = 'xxx';

//cette instruction désactive une règle pour la ligne de code suivante
/* eslint-disable-next-line semi */
var otherTest = `${test}`
    console.log(test, otherTest);