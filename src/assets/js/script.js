var app = angular.module('pos', ['ngCookies', 'ngResource', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/inicio.html?ver=1.0',
            controller: 'inicio'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

    angular.element(document).ready(function() {
        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: false, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: true, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
        });

        $('.collection').css({
            width: (innerWidth + 10) + "px",
            height: (innerHeight - 50) + "px"
        });

        $('.content').css({
            height: (innerHeight - 50) + "px"
        });

        $(".button-collapse").sideNav();

        $('.venta').css({
            width: $('.sidenav').css("width"),
            height: ($('.sidenav').css("height").replace("px", "") - 120) + "px"
        });
        $('.grupo-botones').css({
            width: $('.sidenav').css("width")
        });

        $('.cobro .botones div').css({
        	width: $('.cobro .botones').css("width")
        });


    });

    $(window).on('resize', function() {
        $('.collection').css({
            width: (innerWidth + 10) + "px",
            height: (innerHeight - 50) + "px"
        });

        $('.content').css({
            height: (innerHeight - 50) + "px"
        });


        $('.venta').css({
            width: $('.sidenav').css("width"),
            height: ($('.sidenav').css("height").replace("px", "") - 120) + "px"
        });
        $('.grupo-botones').css({
            width: $('.sidenav').css("width")
        });

        $('.cobro .botones div').css({
        	width: $('.cobro .botones').css("width")
        });
    });

    $rootScope.json = [
    	{
            id: 1,
            nombre: "Hamburguesas",
            productos: [{
                    id: 1,
                    nombre: "Chesse Burger",
                    precio: 1.50,
                    img: "chesse-burger.jpg"
                },
                {
                    id: 2,
                    nombre: "Chicken Crispy",
                    precio: 1.50,
                    img: "chicken-crispy.jpeg"
                },
                {
                    id: 3,
                    nombre: "Tender Grill",
                    precio: 5.00,
                    img: "tender-grill.jpeg"
                },
                {
                    id: 4,
                    nombre: "King de Pollos",
                    precio: 4.00,
                    img: "king-de-pollo.jpg"
                },
                {
                    id: 5,
                    nombre: "Whopper",
                    precio: 4.00,
                    img: "whopper.png"
                },
                {
                    id: 5,
                    nombre: "Whopper II",
                    precio: 4.00,
                    img: "whopper-II.png"
                },
                {
                    id: 5,
                    nombre: "Whopper III",
                    precio: 4.00,
                    img: "whopper-III.jpg"
                },
                {
                    id: 5,
                    nombre: "Whopper Mixta",
                    precio: 4.00,
                    img: "whopper-mixta.jpg"
                }
            ]
        },
        {
            id: 2,
            nombre: "Postres",
            productos: [{
                    id: 1,
                    nombre: "Sundae",
                    precio: 0.90,
                    img: "sundae.jpeg"
                },
                {
                    id: 2,
                    nombre: "King Mix",
                    precio: 1.50,
                    img: "king-mix.jpeg"
                },
                {
                    id: 3,
                    nombre: "Brownie con Helado",
                    precio: 3.50,
                    img: "brownie-con-helado.jpeg"
                },
                {
                    id: 4,
                    nombre: "Chesse Cake",
                    precio: 4.00,
                    img: "chesse-cake.jpeg"
                }
            ]
        },
        {
            id: 3,
            nombre: "Bebidas",
            productos: [{
                    id: 1,
                    nombre: "Coca Cola",
                    precio: 0.90,
                    img: "coca-cola.png"
                },
                {
                    id: 2,
                    nombre: "Pepsi",
                    precio: 0.80,
                    img: "pepsi.png"
                },
                {
                    id: 3,
                    nombre: "Nestea Limon",
                    precio: 0.20,
                    img: "nestea.jpg"
                },
                {
                    id: 5,
                    nombre: "Seven Up",
                    precio: 0.20,
                    img: "7up.jpeg"
                },
                {
                    id: 6,
                    nombre: "Hit",
                    precio: 0.20,
                    img: "hit.jpeg"
                },
            ]
        }
    ];

    $rootScope.venta = {
        ticket: "001",
        total: 72883.43,
        productos: [{
                id: 1,
                nombre: "Chesse Burger",
                precio: 1.50,
                img: "chesse-burger.jpg",
                cantidad: 12,
                active: 0
            },
            {
                id: 4,
                nombre: "Chesse Cake",
                precio: 4.00,
                img: "chesse-cake.jpeg",
                cantidad: 2,
                active: 0
            },
            {
                id: 6,
                nombre: "Hit",
                precio: 0.20,
                img: "hit.jpeg",
                cantidad: 1,
                active: 0
            },
            {
                id: 5,
                nombre: "Whopper Mixta",
                precio: 4.00,
                img: "whopper-mixta.jpg",
                cantidad: 10,
                active: 0
            }
        ]
    };

    $rootScope.config = {
        moneda: {
            nombre: "Dolar Estadounidense",
            simbolo: "$",
            codigo: "VEF"
        }
    };


});

app.controller('inicio', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {



});

// app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

// });

// app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

// });

// app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

// });

// app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

// });

// app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

// });

// app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

// });

// app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

// });

// app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

// });

// app.controller('principal', function($rootScope, $scope, $cookieStore, $q, $http, $window, $location) {

// });