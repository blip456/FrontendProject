document.addEventListener("DOMContentLoaded", init);

// Main variables
var game;
var game_window_class = "game_window";
var blinkTimer;
var clickedElement;

// Screen elements
var intro;
var enter_name;
var quiz;
var minigame;
var hightscore;

// Intro elements
var btnIntroPlay;
var btnIntroHowTo;
var btnIntroHighscore;

// Intro variables
var txbLocation;
var city = "";
var state = "";
var country = "";
var country_code = "";
var player_name = "";

// Enter name elements
var inputName;
var nameRecorder;
var cassettePlaceholder;
var cassettePlaceholderName;
var btnEnterNameNext;
var lblDrag;
var isNameInCassette = false;

// Quiz elements
var quizRecorder;
var cassetteName;
var allQuestions;
var recordingLight;
var btnBefore;
var btnAfter;
var btnStop;
var txtLCD;
var txtCounter1;
var txtCounter2;
var txtCounter3;

// Mini game elements
var miniGameRecorder;

// Quiz variables
var iQuestion = 0;
var iQCounterE = 1;
var iQCounterT = 0;
var iSec = 0;
var iMin = 0;
var preSec = "0";
var preMin = "0"; 
var lengthAllQuestions;
var isBlink = false;
var arrAnswers = [];
// TODO: change this to false and set value true in the ondrop of Bic
var penisInHole = true;


function init()
{

    //Injecting SVG
    var svgInject = document.querySelectorAll("img.inject-me");
    SVGInjector(svgInject);

    // Get main object using the DOM
    game = document.getElementById("game");

    // Get 4 screen objects without DOM
    intro = game.querySelector("#intro");
    enter_name = game.querySelector("#enter_name");
    minigame = game.querySelector("#mini_game");
    quiz = game.querySelector("#quiz");

    // Getting elements
    // Intro
    btnIntroPlay = intro.querySelector("#btnPlay");
    btnIntroHowTo = intro.querySelector("#btnHow");
    btnIntroHighscore = intro.querySelector("#btnHigh");
    
    

    // Listeners   
    btnIntroPlay.addEventListener("click", next_intro);
}

// Functions

// Click for next screen functions
function next_intro()
{
    intro.className = "hidden";
    enter_name.className = "";
    enter_name.className = game_window_class;

    // Enter name
    // Getting elements/vars
    inputName = enter_name.querySelector("#txtName");
    nameRecorder = enter_name.querySelector("#startRecorder");
    btnEnterNameNext = enter_name.querySelector("#groupPlay");
    var btnEnterNameNextDown = enter_name.querySelector("#groupPlayPressed");
    cassettePlaceholder = nameRecorder.querySelector("#Cassette");
    cassettePlaceholderName = nameRecorder.querySelector("#yourNameCassette");
    lblDrag = nameRecorder.querySelector("#lblDrag");
    txtLCD = nameRecorder.querySelector("#txtLCD");

    // Setting elements/vars
    nameRecorder = enter_name.querySelector("#startRecorder");
    nameRecorder.setAttribute("ondrop", "drop(event)");
    nameRecorder.setAttribute("ondragover", "allowDrop(event)");
    cassettePlaceholder.setAttribute("class", "hidden");
    txtLCD.setAttribute("class", "lcd_display");

    // Listener    
    btnEnterNameNext.addEventListener("mousedown", function(){pressEffectDown(this);});
    btnEnterNameNextDown.addEventListener("mouseup", function(){pressEffectUp();next_enter_name()});    
}

function next_enter_name()
{
    if(isNameInCassette)
    {
        enter_name.className = "hidden";
        quiz.className = "";
        quiz.className = game_window_class;  

        // Quiz
        // Getting elements/vars
        quizRecorder = quiz.querySelector(".recorder");
        nameRecorder = quiz.querySelector("#yourNameCassette");
        ulQuestions = quiz.querySelector("#questions");
        recordingLight = quiz.querySelector("#RecordingLight");
        btnBefore = quiz.querySelector("#groupBack");
        btnAfter = quiz.querySelector("#groupForward");
        btnStop = quiz.querySelector("#groupStop");
        txtLCD = quiz.querySelector("#txtLCD");
        txtCounter1 = quiz.querySelector("#txtCounter1");
        txtCounter2 = quiz.querySelector("#txtCounter2");
        txtCounter3 = quiz.querySelector("#txtCounter3");
        allQuestions = quiz.querySelector("#questions").children;
        lblDrag = quizRecorder.querySelector("#lblDrag");
        var btnBeforeDown = quizRecorder.querySelector("#groupBackPressed");
        var btnForwardDown = quizRecorder.querySelector("#groupForwardPressed");
        
        

        // Setting elements/vars
        lengthAllQuestions = allQuestions.length;
        nameRecorder.setAttribute("class", "cassetteName");
        nameRecorder.innerHTML = player_name;
        lblDrag.setAttribute("class", "hidden");
        txtLCD.setAttribute("class", "lcd_display");
        btnBefore.setAttribute("class", "hover");
        btnAfter.setAttribute("class", "hover");

        // Listener
        btnBefore.addEventListener("mousedown", function(){nextQuestion(1); pressEffectDown(this)});        
        btnBeforeDown.addEventListener("mouseup", function(){pressEffectUp();});
        btnAfter.addEventListener("mousedown", function(){nextQuestion(0); pressEffectDown(this)});
        btnForwardDown.addEventListener("mouseup", function(){pressEffectUp();});

        // Varia
        hideAllQuestions();
        showNextQuestion();
        txtCounter3.innerHTML = iQCounterE;

        blinkTimer = setInterval(function()
                                 {
            blinkRecLight();
            controlTimer();
        }, 500);
    }
}

// General stuff
function pressEffectDown(el)
{
    el.classList.toggle('hidden');
    clickedElement = el;
}

function pressEffectUp()
{
    clickedElement.classList.toggle('hidden');
}

// Screen specific functions
// Intro
function getLocation() 
{
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(getCity);
    } else 
    {
        //TODO: Fallback for when there is no possitioning available
    }
}

function getCity(position)
{
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
                //TODO: Show htmlBuilder somewhere
            }
        } 
    });
}



// Enter name
function allowDrop(ev) 
{
    ev.preventDefault();
}

function drag(ev) 
{
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) 
{    
    isNameInCassette = true;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    player_name = inputName.value;
    //TODO: set innerHTML = inputName element
    //cassettePlaceholder.innerHTML += '<foreignObject x="0" y="160" width="325px" height="256px"> <input disabled type="text" placeholder="Name" name="txtName" id="cassetteName" class="txt_big" maxlength="16" value="'+player_name+'" draggable="true" ondragstart="drag(event)"/></foreignObject>';
    cassettePlaceholder.setAttribute("class", "visible");
    cassettePlaceholderName.setAttribute("class", "cassetteName");
    cassettePlaceholderName.innerHTML = player_name;
    lblDrag.setAttribute("class", "hidden");
}



// Quiz
function hideAllQuestions()
{
    for(var i=0; i<=lengthAllQuestions-1; i++)
    {            
        allQuestions[i].className = "hidden";
    }
}

function showNextQuestion()
{     
    hideAllQuestions();   
    if(allQuestions.length > 0)
        allQuestions[iQuestion].className = "visible";   
}

function nextQuestion(isBefore)
{
    if(iQuestion < 29)
    {
        // Add answer to array
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

        showNextQuestion();

        // Check if 15 and start minigame
        if(iQuestion == 14)
            startMiniGame();
    }
    // End the game
    else if(iQuestion == 29)
    {
        // Stop the timer
        window.clearInterval(blinkTimer);
    }
}

function startMiniGame()
{
    //TODO: when at question 15 show the minigame
    minigame.className = "";
    minigame.className = game_window_class;
    //Mini game will be about quickly rewinging a cassette tape with a Bic pen > your quiz time keeps running
    console.log("mini game");
    // Vars
    var iAmountTurned = 0;
    var miniGamecassette = minigame.querySelector("#miniGameCassette");
    var leftTape = miniGamecassette.querySelector("#leftTape");
    var rightTape = miniGamecassette.querySelector("#rightTape");
    var leftGear = miniGamecassette.querySelector("#leftGear");
    var rightGear = miniGamecassette.querySelector("#rightGear");

    // Show overlay in quiz with MiniGame layout

    // Events
    document.onmousewheel = turn;
    penisInHole = true;
    function turn(e)
    {
        // Check if Bic pen is in the cassette hole
        if(penisInHole)
        {
            if(iAmountTurned < 160)
            {
                // Disable scrolling of the rest of the document
                e.preventDefault();
                e.stopPropagation();

                // Each scroll moves the left tape > and moves right tape <
                leftTape.setAttribute("transform", "translate("+iAmountTurned/4+")");
                rightTape.setAttribute("transform", "translate("+iAmountTurned/4+")");
                leftGear.setAttribute("transform", "rotate("+iAmountTurned*4+" 146 167)");
                rightGear.setAttribute("transform", "rotate("+iAmountTurned*4+" 349 167)");

                iAmountTurned ++;
            }
            else
                minigame.className = "hidden";
        }
    }
}

function blinkRecLight()
{
    if(isBlink)
    {
        //TODO: use class togle for blinking instead of style fill
        recordingLight.style.fill = "#CC0000";
        isBlink = false;
    }
    else
    {
        //TODO: use class togle for blinking instead of style fill
        recordingLight.style.fill = "#FF0000";
        isBlink = true;
    }
}

function controlTimer()
{
    if(isBlink)
    {
        if(iSec == 59)
        {
            iMin +=1;
            iSec = -1;                
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
}

