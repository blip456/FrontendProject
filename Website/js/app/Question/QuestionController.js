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
    };
    var onError = function(response)
    {
        isFromLocal = true;
        console.log(response);
        if(typeof(Storage) !== "undefined") 
        {                
            var arrTemp = JSON.parse(localStorage["storageQuestions"]);
            var l = arrTemp.length;
            for(i=0; i<l; i++)
            {
                var q = new Question(arrTemp[i].Quest, arrTemp[i].ID, arrTemp[i].Cat.Cat, arrTemp[i].ImgUrl);
                $scope.questions.push(q);
            }
        }
        else 
        {
            alert("You are offline and have no webstorage! This site is pretty useless then");
        }
    };
    $http.get("http://80squiz.azurewebsites.net/api/v1/question").then(onQuestionGet, onError);    
}

