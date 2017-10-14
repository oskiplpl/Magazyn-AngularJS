var myApp = angular.module('myApp', []);

class article {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

var articleArray = [];

myApp.config(function () {
    articleArray.push(new article('Myszka', 20));
    articleArray.push(new article('Klawiatura', 5));
    articleArray.push(new article('Monitor', 100));
    articleArray.push(new article('Podkładka', 0));
    articleArray.push(new article('Głośniki', 20));
});

myApp.controller('myController', function ($scope) {

    $scope.articles = articleArray;

    $scope.decreasArticleQuantity = function (article) {
        var index = $scope.articles.indexOf(article);
        var article = $scope.articles[index];

        if(article.quantity === 0) return;
        article.quantity--;
    }

    $scope.increasArticleQuantity = function (article) {
        var index = $scope.articles.indexOf(article);
        $scope.articles[index].quantity++;
    }

    $scope.removeArticle = function (article) {
        var index = $scope.articles.indexOf(article);
        $scope.articles.splice(index, 1);
    }

    $scope.addArticle = function () {
        var articleName = $scope.addedArticleName;
        var articleQuantity = $scope.addedArticleQuantity;
        if (articleQuantity < 0)
            articleQuantity = 0;

        var newArticle = new article(articleName, articleQuantity);

        var findExisting = $scope.articles.findArticleByName(newArticle);

        if (findExisting !== -1) {
            $scope.articles[findExisting].quantity += articleQuantity;
        } else {
            $scope.articles.push(newArticle);
        }
        $scope.addedArticleName = "";
        $scope.addedArticleQuantity = null;
    }
});

Array.prototype.findArticleByName = function (article) {
    for (i = 0; i < this.length; i++) {
        if (this[i].name === article.name)
            return i;
    }
    return -1;
}