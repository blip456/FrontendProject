document.addEventListener("DOMContentLoaded", init);
var appCache = window.applicationCache;
//appCache.update(); // Attempt to update the user's cache.

if (appCache.status == window.applicationCache.UPDATEREADY) {
    appCache.swapCache();  // The fetch was successful, swap in the new cache.
}


// Browser checking

var isIE = false;
if ((navigator.appVersion.indexOf("MSIE 8.") != -1) || (navigator.appVersion.indexOf("MSIE 7.") != -1))
{
    isIE = true;
} 

if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    isIE = true;
}

var isIE9 = false;
if (navigator.appVersion.indexOf("MSIE 9.") != -1)
{
    isIE9 = true;
} 

// Mobile checking
var isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
    isMobile = true;
}

// Main variables
var game;
var game_window_class = "game_window";
var blinkTimer;
var clickedElement;
var isFromLocal = false;

// Screen elements
var intro;
var enter_name;
var quiz;
var minigame;
var result;

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
var btnEnterNameNextDown;
var lblDrag;
var isNameInCassette = false;
var arrow;

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
var sound1 = new Audio("https://imagesyoranbroodcooren.blob.core.windows.net/thenandnowimg/button1.mp3"); 
var sound2 = new Audio("https://imagesyoranbroodcooren.blob.core.windows.net/thenandnowimg/button2.mp3"); 
var sound3 = new Audio("https://imagesyoranbroodcooren.blob.core.windows.net/thenandnowimg/button3.mp3"); 
var sound4 = new Audio("https://imagesyoranbroodcooren.blob.core.windows.net/thenandnowimg/button4.mp3"); 
var close = new Audio("https://imagesyoranbroodcooren.blob.core.windows.net/thenandnowimg/close.mp3"); 


// Mini game elements
var miniGameRecorder;

// Quiz variables
var iQuestion = 0;
var iQCounterE = 1;
var iQCounterT = 0;
var iTime = 0;
var iSec = 0;
var iMin = 0;
var preSec = "0";
var preMin = "0"; 
var lengthAllQuestions;
var isBlink = false;
var arrAnswers = [];
var arrCorrectAnswers = [];
// TODO: change this to false and set value true in the ondrop of Bic
var penisInHole = true;
var isScorePushed = false;


function init()
{   
    // Check if offline > Check local storage for questions    
    // Not offline? > check if there are questions in local storage else add 30 new questions
    CheckLocalStorage();

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
    result = game.querySelector("#result");

    // Getting elements
    // Intro
    btnIntroPlay = intro.querySelector("#btnPlay");
    btnIntroHowTo = intro.querySelector("#btnHow");
    btnIntroHighscore = intro.querySelector("#btnHigh");    

    // Listeners   
    btnIntroPlay.addEventListener("click", next_intro);
    btnIntroHowTo.addEventListener("click", function(){window.location = ("howto.html");})
    btnIntroHighscore.addEventListener("click", function(){window.location = ("highscore.html");})


    getLocation();
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
    btnEnterNameNextDown = enter_name.querySelector("#groupPlayPressed");
    arrow = enter_name.querySelector("#helparrow");
    cassettePlaceholder = nameRecorder.querySelector("#Cassette");
    cassettePlaceholderName = nameRecorder.querySelector("#yourNameCassette");
    lblDrag = nameRecorder.querySelector("#lblDrag");
    txtLCD = nameRecorder.querySelector("#txtLCD");

    // Setting elements/vars
    nameRecorder.setAttribute("width", "333");
    nameRecorder.setAttribute("height", "500");
    nameRecorder.setAttribute("preserveAspectRatio", "xMidYMid meet"); 
    nameRecorder.setAttribute("ondrop", "drop(event)");
    nameRecorder.setAttribute("ondragover", "allowDrop(event)");
    cassettePlaceholder.setAttribute("class", "hidden");
    txtLCD.setAttribute("class", "lcd_display");
    btnEnterNameNext.setAttribute("class", "hover");

    // Allowing non drag and drop to just do his stuf
    if(isIE9 || isMobile)
    {
        isNameInCassette = true;
        lblDrag.textContent = "Press play to start";  
        arrow.setAttribute("class", "hidden");
    }

    // Listener     
    btnEnterNameNext.addEventListener("mousedown", function(){pressEffectDown(this);});
    btnEnterNameNextDown.addEventListener("mouseup", function(){pressEffectUp();next_enter_name();});
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
        cassettePlaceholderName = quiz.querySelector("#yourNameCassette");
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
        quizRecorder.setAttribute("width", "333");
        quizRecorder.setAttribute("height", "500");
        quizRecorder.setAttribute("preserveAspectRatio", "xMidYMid meet"); 
        lengthAllQuestions = allQuestions.length;
        cassettePlaceholderName.setAttribute("class", "cassetteName");
        cassettePlaceholderName.textContent = player_name;
        lblDrag.setAttribute("class", "hidden");
        txtLCD.setAttribute("class", "lcd_display");
        btnBefore.setAttribute("class", "hover");
        btnAfter.setAttribute("class", "hover");

        // Listener
        btnBefore.addEventListener("mousedown", function(){nextQuestion(true); pressEffectDown(this);});        
        //btnBeforeDown.addEventListener("mouseup", function(){pressEffectUp(); nextQuestion(true);});
        btnAfter.addEventListener("mousedown", function(){nextQuestion(false); pressEffectDown(this);});
        //btnForwardDown.addEventListener("mouseup", function(){pressEffectUp(); nextQuestion(false);});

        document.addEventListener("mouseup", function(){pressEffectUp();});

        // Varia
        hideAllQuestions();
        showNextQuestion();
        txtCounter3.textContent = iQCounterE;

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
    playRandomClickSound();
    //el.classList.toggle('hidden');
    el.setAttribute("class", "hover hidden");
    clickedElement = el;
}

function pressEffectUp()
{
    //clickedElement.classList.toggle('hidden');      
    if(clickedElement != undefined)   
        clickedElement.setAttribute("class", "hover");

}

function playRandomClickSound()
{
    var i = Math.floor((Math.random() * 4) + 1);  
    switch(i)
    {
        case 1:
            playSoundEffect(sound1);
        case 2:
            playSoundEffect(sound2);
        case 3:
            playSoundEffect(sound3);
        case 4:
            playSoundEffect(sound4);
    }
}

function playSoundEffect(sound)
{
    sound.load();
    sound.play();

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

    if (ev.preventDefault) {
        ev.preventDefault(); // Necessary. Allows us to drop.
    }

    return false;
}

function drag(ev) 
{       
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) 
{    
    if (ev.preventDefault) {
        ev.preventDefault(); // Necessary. Allows us to drop.
    }


    //ev.preventDefault();

    $(arrow).addClass("visibility");
    playSoundEffect(close);
    isNameInCassette = true;
    inputName.setAttribute("class", "hidden visibility");
    console.log(inputName);
    player_name = inputName.value;
    cassettePlaceholder.setAttribute("class", "visible");
    cassettePlaceholderName.setAttribute("class", "cassetteName");
    cassettePlaceholderName.textContent = player_name;
    lblDrag.setAttribute("class", "hidden");
    return false;
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
    if(isBefore != undefined)
    {
        if(iQuestion < 29)
        {
            // Add answer to array
            arrAnswers.push(isBefore);

            iQuestion +=1
            if(iQCounterE < 9)
            {
                iQCounterE +=1;
                txtCounter3.textContent = iQCounterE;
            }
            else
            {   
                iQCounterE = 0;
                iQCounterT +=1;
                txtCounter3.textContent = iQCounterE ;           
                txtCounter2.textContent = iQCounterT;            
            }

            showNextQuestion();

            // Check if 15 and start minigame
            if(iQuestion == 14)
                startMiniGame();
        }
        // End the game
        else if(iQuestion == 29)
        {
            arrAnswers.push(isBefore);
            // Stop the timer
            window.clearInterval(blinkTimer);
            if(isFromLocal)        
                localStorage.removeItem("storageQuestions");
            if(!isScorePushed)
            {            
                AddScore();            
                GetAnswers();

                isScorePushed = true;
            }
        }
    }
}

function startMiniGame()
{
    pressEffectUp();

    $(minigame).removeClass("visibility");
    //Mini game will be about quickly rewinging a cassette tape with a Bic pen > your quiz time keeps running

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
    document.addEventListener("DOMMouseScroll", turn, false);
    document.body.addEventListener("touchmove", turn);
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

function ShowResult()
{
    $(result).removeClass("hidden");
    $(quiz).addClass("hidden");

    var stringbuilder = "";
    var correct = "";
    var correctAnswers = result.querySelector("#answers");
    var l = arrCorrectAnswers.length;
    for(i=0; i < l; i++)
    {      
        correct = "";
        if(arrAnswers[i] == true && parseInt(arrCorrectAnswers[i].Year) < parseInt(80) ||  arrAnswers[i] == false && parseInt(arrCorrectAnswers[i].Year) >= parseInt(80))   
            correct = "<span class='correct'> (Correct)</span>";
        else
            correct = "<span class='wrong'> (Wrong)</span>";


        if(arrCorrectAnswers[i].Cat.Cat == "Movies")            
            stringbuilder += "<li>Q: When was the movie " + arrCorrectAnswers[i].Quest +" released?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
        else if(arrCorrectAnswers[i].Cat.Cat == "Books")            
            stringbuilder += "<li>Q: When was the book " + arrCorrectAnswers[i].Quest +" published?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
        else if(arrCorrectAnswers[i].Cat.Cat == "TV Shows")            
            stringbuilder += "<li>Q: When did " + arrCorrectAnswers[i].Quest +" first aired on TV?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
        else if(arrCorrectAnswers[i].Cat.Cat == "Music")            
            stringbuilder += "<li>Q: When was " + arrCorrectAnswers[i].Quest +" first played on the radio?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
        else if(arrCorrectAnswers[i].Cat.Cat == "Inventions")            
            stringbuilder += "<li>Q: When was the " + arrCorrectAnswers[i].Quest +" invented?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
        else if(arrCorrectAnswers[i].Cat.Cat == "Movies")            
            stringbuilder += "<li>Q: When was " + arrCorrectAnswers[i].Quest +" invented?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
        else if(arrCorrectAnswers[i].Cat.Cat == "Fashion")            
            stringbuilder += "<li>Q: When was " + arrCorrectAnswers[i].Quest +" fashionable?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
        else if(arrCorrectAnswers[i].Cat.Cat == "Games")            
            stringbuilder += "<li>Q: When was the game " + arrCorrectAnswers[i].Quest +" released?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
        else if(arrCorrectAnswers[i].Cat.Cat == "Game Consoles")            
            stringbuilder += "<li>Q: When was the " + arrCorrectAnswers[i].Quest +" released?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
        else
            stringbuilder += "<li>Q: Foutje precies " + arrCorrectAnswers[i].Quest +" released?</li><li>A: 19"+arrCorrectAnswers[i].Year +correct+"</li><li></li>" ;
    }
    correctAnswers.innerHTML = stringbuilder;
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
        iTime ++;
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
        txtLCD.textContent = preMin+iMin+":"+preSec+iSec;
    }
}

function AddScore()
{
    $.ajax({
        url: "http://80squiz.azurewebsites.net/api/v1/highscore",
        type: "Post",
        data: JSON.stringify([player_name, iTime, city + ", "+ country, JSON.stringify(arrAnswers), JSON.stringify(arrQuestionIDs)]),
        contentType: 'application/json; charset=utf-8',
        success: function (data) { GetScore();},
        error: function () { alert('error add score'); }
    });
}

function GetAnswers()
{
    $.ajax({
        url: "http://80squiz.azurewebsites.net/api/v1/question/?values="+JSON.stringify(arrQuestionIDs),
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (data) { arrCorrectAnswers = data; ShowResult(); },
        error: function () { alert('error get answers'); }
    });
}

function GetScore()
{    
    $.ajax({
        url: "http://80squiz.azurewebsites.net/api/v1/highscore?latest=true",
        type: "GET",
        contentType: 'application/json; charset=utf-8',
        success: function (data) { EditScore(data); },
        error: function () { alert('error get score'); }
    });
}

function EditScore(data)
{
    var sc = data.Score;
    var scoreboard = result.querySelector("#scoreboard");
    scoreboard.innerHTML = ""+sc;
}

function CheckLocalStorage()
{
    if (localStorage.getItem("storageQuestions") === null) 
    {
        $.ajax({
            url: "http://80squiz.azurewebsites.net/api/v1/question",
            type: "Get",
            contentType: 'application/json; charset=utf-8',
            success: function (data) 
            {
                localStorage["storageQuestions"] = JSON.stringify(data);
            },
            error: function () { alert('error localstorage'); }
        });
    }
}