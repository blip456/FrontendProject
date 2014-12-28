/*
    Nodige dingen voor object:
    --------------------------
    ID
    Name
    Score
    Date
    Location
*/

//Contstructor functie (moet met hoofdletter beginnen)
function Highscore(name, id, score, date, location)
{
    this.name = name;
    this.id = id;   
    this.score = score;
    this.date = date;
    this.location = location;
}

//Properties instellen
Highscore.prototype = {
    // IE9 > ECMA SCRIPT 5      bla.Title = "Blabla";
    get Name(){return this.name;},
    set Name(v){this.name = v;},

    get ID(){return this.id;},
    set ID(v){this.id = v;},
    
    get Score(){return this.score},
    set Score(v){this.score = v},
    
    get Date(){return this.date},
    set Date(v){this.date = v},
    
    get Location(){return this.location},
    set Location(v){this.location = v}

    //Methodes
}