document.addEventListener("DOMContentLoaded", init);

var game;

var intro;
var enter_name;
var quiz;
var highscore;

var game_window_class = "game_window";

// intro
var btnPlay;

// enter_name
var txbLocation;
var city = "";
var state = "";
var country = "";
var country_code = "";
var player_name = "";
var txtPlayerName;
var btnEnterNameNext;

// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');

// Do the injection
SVGInjector(mySVGsToInject);

// QUIZ
var recorder;
var recordingLight;
var btnBefore;
var btnAfter;
var btnStop;
var txtLCD;
var txtCounter1;
var txtCounter2;
var txtCounter3;


function init()
{    
    game = document.getElementById("game");

    // Ophalen van de 4 schermen
    intro = game.children[0];
    enter_name = game.children[1];
    quiz = game.children[2];
    highscore = game.children[3];

    // intro
    btnPlay = document.getElementById("btnPlay");

    // enter_name
    txtPlayerName = enter_name.children[1];
    txbLocation = enter_name.children[2];
    btnEnterNameNext = enter_name.children[3];

    // click listeneres
    btnPlay.addEventListener("click",play);
    btnEnterNameNext.addEventListener("click", enterNameNext);


    getLocation();

    console.log(game);
}

// Button click functions
function play()
{    
    intro.className = "hidden";
    enter_name.className = "";
    enter_name.className = game_window_class;
}

function enterNameNext()
{
    enter_name.className = "hidden";
    quiz.className = "";
    quiz.className = game_window_class;


    var iQuestion = 0;
    var iQCounterE = 0;
    var iQCounterT = 0;
    var iSec = 0;
    var iMin = 0;
    var preSec = "0";
    var preMin = "0"; 
    
    var arrAnswers = [];
    
    recorder = quiz.querySelector(".recorder");
    recordingLight = recorder.querySelector("#RecordingLight");
    txtLCD = recorder.querySelector("#txtLCD");
    txtCounter1 = recorder.querySelector("#txtCounter1");
    txtCounter2 = recorder.querySelector("#txtCounter2");
    txtCounter3 = recorder.querySelector("#txtCounter3");
    btnBefore = recorder.querySelector("#groupBack");
    btnAfter = recorder.querySelector("#groupForward");

    // click listeneres
    btnBefore.addEventListener("click", function(){next(1);});
    btnAfter.addEventListener("click", function(){next(0);});
    
    
    
    function next(isBefore)
    {
        arrAnswers.push(isBefore);
        iQuestion +=1
        if(iQCounterE < 9)
        {
            iQCounterE +=1;
            txtCounter3.innerHTML = iQCounterE;
        }
        else
        {   
            iQCounterE = 0;
            iQCounterT +=1;
            txtCounter3.innerHTML = iQCounterE ;           
            txtCounter2.innerHTML = iQCounterT;            
        }
    }

    
    var isBlink = false;
    setInterval(function () {
        if(isBlink)
        {
            recordingLight.style.fill = "#CC0000";
            isBlink = false;
            if(iSec == 59)
            {
                iMin +=1;
                iSec = 0;                
            }
            if(iSec <9)
            {
                preSec = "0";
            }
            else{
                preSec = "";
            }
            if(iMin < 10)
            {
                preMin = "0";
            }
            else
            {
                preMin = "";
            }
            if(iMin >= 60)
            {
                console.log("Game over");
            }

            iSec += 1;                                
            txtLCD.innerHTML = preMin+iMin+":"+preSec+iSec;


        }
        else
        {
            recordingLight.style.fill = "#ff0000";
            isBlink = true;
        }        

    }, 500);

    //showQuestions();  
}

// intro
function getLocation() {
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(getCity);
    } else 
    {
        //x.innerHTML = "Geolocation is not supported by this browser.";

    }
}

function getCity(position)
{
    //google key: AIzaSyCpVoiwc3RoR2IhfAePjNhG5so7BuewF0c
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) 
        {
            var result = results[0];        

            for(var i=0, len=result.address_components.length; i<len; i++) {
                var ac = result.address_components[i];
                if(ac.types.indexOf("locality") >= 0) city = ac.long_name;
                if(ac.types.indexOf("administrative_area_level_1") >= 0) state = ac.long_name;
                if(ac.types.indexOf("country") >= 0) country = ac.long_name;               
                if(ac.types.indexOf("country") >= 0) country_code = ac.short_name;               
            }
            if(city != '' && state != '' && country !='' && country_code !='') {                
                var htmlBuilder = "";
                htmlBuilder = "<img class='country_flag' src=http://www.geonames.org/flags/x/"+country_code.toLowerCase()+".gif><p>" + city + "</p>";
                txbLocation.innerHTML = htmlBuilder;
            }
        } 
    });

}


// questions
function showQuestions()
{
    var htmlBuilder = "<form>";
    for(var i=0, l=questions.length; i < l; i++)
    {
        htmlBuilder += "<div class='question'>"+questions[i].Quest+"</div>";    
    }

    htmlBuilder += "</form>";
    quiz.innerHTML = htmlBuilder;
}







