// -----------------------------------------------------//
// ----------------- BACKGROUND IMAGE ------------------//
// -----------------------------------------------------//


// -------------------------------------------------//
// ----------------- CONFIGURATOR ------------------//
// -------------------------------------------------//

//Zurücksetzen
//function Zurücksetzen(dd_schnuersenkel, dd_naehte, dd_aufdruck, dd_muster) {
function Zurücksetzen() {
    var elements = document.getElementsByTagName('select');
    for (var i = 0; i < elements.length; i++) {
        elements[i].selectedIndex = 0;
    }
}

//Logik des Konfigurators
function Konfiguration(dd_schnuersenkel, dd_naehte, dd_aufdruck, dd_muster) {

    //Auswerten dd_schnuersenkel:            
    switch (document.getElementById('dd_schnuersenkel').value) {


        case "Weiß":
            var grundfarbe_schuh = document.getElementById('weißer_schuh');
            grundfarbe_schuh.style.display = 'block';

            //Farben auf none
            var rosaSchnuer = document.getElementById('rosaSchnuer');
            rosaSchnuer.style.display = 'none';

            var grauSchnuer = document.getElementById('grauSchnuer');
            grauSchnuer.style.display = 'none';

            var hellblauSchnuer = document.getElementById('hellblauSchnuer');
            hellblauSchnuer.style.display = 'none';

            break;


        case "Rosa":
            var rosaSchnuer = document.getElementById('rosaSchnuer');
            rosaSchnuer.style.display = 'block';
            console.log(rosaSchnuer.style);

            //andere Farben nicht anzeigen
            var grauSchnuer = document.getElementById('grauSchnuer');
            grauSchnuer.style.display = 'none';

            var hellblauSchnuer = document.getElementById('hellblauSchnuer');
            hellblauSchnuer.style.display = 'none';

            break;

        case "Grau":
            var grauSchnuer = document.getElementById('grauSchnuer');
            grauSchnuer.style.display = 'block';

            //andere Farben nicht anzeigen
            var rosaSchnuer = document.getElementById('rosaSchnuer');
            rosaSchnuer.style.display = 'none';

            var hellblauSchnuer = document.getElementById('hellblauSchnuer');
            hellblauSchnuer.style.display = 'none';

            break;

        case "Hellblau":
            var hellblauSchnuer = document.getElementById('hellblauSchnuer');
            hellblauSchnuer.style.display = 'block';

            //andere Farben nicht anzeigen
            var rosaSchnuer = document.getElementById('rosaSchnuer');
            rosaSchnuer.style.display = 'none';

            var grauSchnuer = document.getElementById('grauSchnuer');
            grauSchnuer.style.display = 'none';

            break;



    }

    //Auswerten dd_naehte: 
    switch (document.getElementById('dd_naehte').value) {
        case "Weiß":

            var grundfarbe_schuh = document.getElementById('weißer_schuh');
            grundfarbe_schuh.style.display = 'block';

            //andere Farben nicht anzeigen
            var blauNaht = document.getElementById('blauNaht');
            blauNaht.style.display = 'none';

            var gruenNaht = document.getElementById('gruenNaht');
            gruenNaht.style.display = 'none';

            var rotNaht = document.getElementById('rotNaht');
            rotNaht.style.display = 'none';

            break;

        case "Blau":
            var blauNaht = document.getElementById('blauNaht');
            blauNaht.style.display = 'block';

            //andere Farben nicht anzeigen
            var rotNaht = document.getElementById('rotNaht');
            rotNaht.style.display = 'none';

            var gruenNaht = document.getElementById('gruenNaht');
            gruenNaht.style.display = 'none';
            break;

        case "Rot":
            var rotNaht = document.getElementById('rotNaht');
            rotNaht.style.display = 'block';

            //andere Farben nicht anzeigen
            var blauNaht = document.getElementById('blauNaht');
            blauNaht.style.display = 'none';

            var gruenNaht = document.getElementById('gruenNaht');
            gruenNaht.style.display = 'none';

            break;

        case "Grün":
            var gruenNaht = document.getElementById('gruenNaht');
            gruenNaht.style.display = 'block';

            //andere Farben nicht anzeigen
            var blauNaht = document.getElementById('blauNaht');
            blauNaht.style.display = 'none';

            var rotNaht = document.getElementById('rotNaht');
            rotNaht.style.display = 'none';

            break;


    }



    //Auswerten dd_aufdruck:
    switch (document.getElementById('dd_aufdruck').value) {

        case "Keine Angabe":

            //Aufdrucke auf none
            var planet = document.getElementById('planet');
            planet.style.display = 'none';

            var musik = document.getElementById('musik');
            musik.style.display = 'none';

            var flammen = document.getElementById('flammen');
            flammen.style.display = 'none';

            break;

        case "Flammen":
            var flammen = document.getElementById('flammen');
            flammen.style.display = 'block';

            //Aufdrucke auf none
            var planet = document.getElementById('planet');
            planet.style.display = 'none';

            var musik = document.getElementById('musik');
            musik.style.display = 'none';

            break;


        case "Planet":
            var planet = document.getElementById('planet');
            planet.style.display = 'block';

            //Aufdrucke auf none
            var flammen = document.getElementById('flammen');
            flammen.style.display = 'none';

            var musik = document.getElementById('musik');
            musik.style.display = 'none';

            break;

        case "Musik":
            var musik = document.getElementById('musik');
            musik.style.display = 'block';

            //Aufdrucke auf none
            var flammen = document.getElementById('flammen');
            flammen.style.display = 'none';

            var planet = document.getElementById('planet');
            planet.style.display = 'none';

            break;



    }
    //Auswerten dd_muster:
    switch (document.getElementById('dd_muster').value) {

        case "Keine Angabe":

            //Muster auf none
            var diamonds = document.getElementById('diamonds');
            diamonds.style.display = 'none';

            var zigzag = document.getElementById('zigzag');
            zigzag.style.display = 'none';

            break;

        case "Diamanten":
            var diamonds = document.getElementById('diamonds');
            diamonds.style.display = 'block';

            //Muster auf none
            var zigzag = document.getElementById('zigzag');
            zigzag.style.display = 'none';

            break;


        case "Zick-Zack":
            var zigzag = document.getElementById('zigzag');
            zigzag.style.display = 'block';

            //Muster auf none
            var diamonds = document.getElementById('diamonds');
            diamonds.style.display = 'none';

            break;
    }

}