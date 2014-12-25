var arrQuestionIDs = [];
var QuestionController = function($scope, $http)
{
    // Verbinding met view
    $scope.questions = [];

    var onQuestionGet = function(response)
    {       
        angular.forEach(response.data, function(value, key)
                        {
            var q = new Question(value.Quest, value.ID, value.Cat.Cat, value.ImgUrl);
            arrQuestionIDs.push(value.ID);
            $scope.questions.push(q);
        }); 
        console.log($scope.questions);
    };
    var onError = function(response)
    {
        console.log(response);
    };
    $http.get("http://80squiz.azurewebsites.net/api/v1/question").then(onQuestionGet, onError);    
}

