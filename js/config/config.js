var app = angular.module("app", [
    "ui.router",
    'sliderApp'
]);
app.config([
    '$stateProvider',
    '$locationProvider',
    "$urlRouterProvider",
    function($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/index");
        $stateProvider
            .state('index', { //首页路由
                url: "/index",
                templateUrl: 'views/index.html',
                controller: 'indexCtrl'
            })
    }
])