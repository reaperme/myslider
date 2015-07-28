/**
 * Created by Reeoo on 2015/7/12 0012.
 */
app.controller("indexCtrl", ["$scope", '$timeout', function ($scope, $timeout) {
    $scope.$on('bbb', function (event, data) {
        //console.log(event);
        //console.log(data.index);
    })

    $scope.data = [{
        title: "标题1",
        imageUrl: "../../img/1.jpg"
    }, {
        title: "标题2",
        imageUrl: "../../img/2.jpg"
    }, {
        title: "标题3",
        imageUrl: "../../img/3.jpg"
    }, {
        title: "标题4",
        imageUrl: "../../img/4.jpg"
    }, {
        title: "标题5",
        imageUrl: "../../img/5.jpg"
    }, {
        title: "标题6",
        imageUrl: "../../img/6.jpg"
    }, {
        title: "标题7",
        imageUrl: "../../img/7.jpg"
    }, {
        title: "标题8",
        imageUrl: "../../img/8.jpg"
    }, {
        title: "标题9",
        imageUrl: "../../img/9.jpg"
    }]

    $scope.name = "我的名字";

    //$scope.data = b;

    var aa = 0;

    $scope.aaa = function () {
        if (aa === 0) {
            $scope.data = [{
                title: "标题1",
                imageUrl: "../../img/11.jpg"
            }, {
                title: "标题2",
                imageUrl: "../../img/12.jpg"
            }, {
                title: "标题3",
                imageUrl: "../../img/13.jpg"
            }, {
                title: "标题4",
                imageUrl: "../../img/14.jpg"
            }, {
                title: "标题5",
                imageUrl: "../../img/15.jpg"
            }, {
                title: "标题6",
                imageUrl: "../../img/16.jpg"
            }, {
                title: "标题7",
                imageUrl: "../../img/17.jpg"
            }, {
                title: "标题8",
                imageUrl: "../../img/18.jpg"
            }]
            aa = 1;
        }
        else {
            $scope.data = [{
                title: "标题1",
                imageUrl: "../../img/1.jpg"
            }, {
                title: "标题2",
                imageUrl: "../../img/2.jpg"
            }, {
                title: "标题3",
                imageUrl: "../../img/3.jpg"
            }, {
                title: "标题4",
                imageUrl: "../../img/4.jpg"
            }, {
                title: "标题5",
                imageUrl: "../../img/5.jpg"
            }, {
                title: "标题6",
                imageUrl: "../../img/6.jpg"
            }, {
                title: "标题7",
                imageUrl: "../../img/7.jpg"
            }, {
                title: "标题8",
                imageUrl: "../../img/8.jpg"
            }, {
                title: "标题9",
                imageUrl: "../../img/9.jpg"
            }]

            aa = 0;
        }
    }

    $scope.sizes = {
        width: document.body.clientWidth + "px",
        display: "block",
        height: 3 * document.body.clientWidth / 4 + "px"
    }
}])