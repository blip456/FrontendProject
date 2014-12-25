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
function Question(quest, year, cat, imgURL)
{
    this.quest = quest;
    this.year = year;   
    this.cat = cat;
    this.imgURL = imgURL;
}

//Properties instellen
Question.prototype = {
    // IE9 > ECMA SCRIPT 5      bla.Title = "Blabla";
    get Quest(){return this.quest;},
    set Quest(v){this.quest = v;},

    get Year(){return this.year;},
    set Year(v){this.year = v;},
    
    get Category(){return this.cat},
    set Category(v){this.cat = v},
    
    get ImgURL(){return this.imgURL},
    set ImgURL(v){this.imgURL = v}

    //Methodes
}