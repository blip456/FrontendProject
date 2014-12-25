/*
    Nodige dingen voor object:
    --------------------------
    ID
    Quest
    Year
    Cat
    Price
    IsCorrect
*/

//Contstructor functie (moet met hoofdletter beginnen)
function Question(quest, id, cat, imgURL)
{
    this.quest = quest;
    this.id = id;   
    this.cat = cat;
    this.imgURL = imgURL;
}

//Properties instellen
Question.prototype = {
    // IE9 > ECMA SCRIPT 5      bla.Title = "Blabla";
    get Quest(){return this.quest;},
    set Quest(v){this.quest = v;},

    get ID(){return this.id;},
    set ID(v){this.id = v;},
    
    get Category(){return this.cat},
    set Category(v){this.cat = v},
    
    get ImgURL(){return this.imgURL},
    set ImgURL(v){this.imgURL = v}

    //Methodes
}