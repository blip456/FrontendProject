var HighscoreController = function($scope, $http)
{
    // Verbinding met view
    $scope.highscores = [];

    var onScoreGet = function(response)
    {       
        var rank = 1;
        var profix = "";
        angular.forEach(response.data, function(value, key)
        {
            // name, id, score, date, location
            if(rank === 1)
                profix = "st";
            else if(rank ===2)
                profix = "nd";
            else if(rank === 3)
                profix = "rd";
            else
                profix = "th";
            var s = new Highscore(value.Name, value.ID, value.Score, value.Date, value.Location, rank+profix); 
            rank ++;
            $scope.highscores.push(s);
        }); 
        console.log($scope.highscores);

    };
    var onError = function(response)
    {        
        console.log($scope.highscores);
        alert("error on scoreget")
    };
    $http.get("http://80squiz.azurewebsites.net/api/v1/highscore").then(onScoreGet, onError);    
}

