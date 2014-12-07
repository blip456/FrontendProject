
var QuestionController = function($scope, $http)
{
    // Verbinding met view
    $scope.questions = [];

    var onQuestionGet = function(response)
    {       
        angular.forEach(response.data, function(value, key)
                        {
            var q = new Question(value.Quest, value.Year, value.Cat.Cat);
            $scope.questions.push(q);
        }); 
        
    };
    var onError = function(response)
    {
        console.log(response);
    };
    $http.get("http://then-and-now.azurewebsites.net/api/v1/question").then(onQuestionGet, onError);    
}

