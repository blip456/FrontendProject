var HighscoreController = function($scope, $http)
{
    // Verbinding met view
    $scope.highscores = [];

    var onScoreGet = function(response)
    {       

        angular.forEach(response.data, function(value, key)
        {
            // name, id, score, date, location
            var s = new Highscore(value.Name, value.ID, value.Score, value.Date, value.Location);            
            $scope.highscores.push(s);
        }); 
        console.log($scope.highscores);

    };
    var onError = function(response)
    {        
        console.log($scope.highscores);
    };
    $http.get("http://80squiz.azurewebsites.net/api/v1/highscore").then(onScoreGet, onError);    
}

