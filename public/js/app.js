'use strict';

$(document).ready(function() {

    var url = $(location).attr('href').split("/");
    console.log(url[url.length-1]);

    /**
     * Fix the sidebar ACTIVE-links
     */
    $('.nav-sidebar li').click(function(e) {

        $('.nav-sidebar li.active').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }

        //e.preventDefault();
    });

    /**
     * Admin dashboard master object i guess.
     */
    var admin = {
        init: function(config) {
            this.config = config;

            $.ajaxSetup({
                url: '/admin/',
                type: 'GET',
                dataType: 'json',
            });


            this.bindEvents();
        },
        bindEvents: function() {
            this.config.usersLink.on('click', this.displayUsers);
            this.config.categoriesLink.on('click', this.displayCategories);
            this.config.productsLink.on('click', this.displayProducts);
        },

        displayUsers: function(event) {
            var self = admin;

            $.ajax({
                url: '/admin/users'
            }).done(function (users) {
                self.config.main.html('<h1>Users with ajax</h1>');
                $.each(users, function(index, element) {
                    self.config.main.append($('<div>', {
                        text: element.username
                    }));
                });
                //console.log(users);
            })
            .fail(function() {
                console.log("error - users");
            });
        },

        displayCategories: function (event) {
            var self = admin;

            $.ajax({
                url: '/admin/categories'
            }).done(function (categories) {

                self.config.main.html('<h1>Categories with ajax:d </h1>');
                $.each(categories, function (index, element) {
                    self.config.main.append($('<div>', {
                        text: element.title
                    }));
                });

            }).fail(function () {
                console.log('FAILED CATEGORIES');
            });
        },

        displayProducts: function (event) {
            var self = admin;
            $.ajax({
                url: '/admin/products'
            }).done(function (products) {
                self.config.main.html('<h1>Products with ajax</h1>');
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log("error - products", errorThrown);
            });
        }
    };

    var cart = {
        init: function(config) {
            this.config = config;

            $.ajaxSetup({
                url: '/cart/',
                type: 'GET',
                dataType: 'json',
            });

            this.bindEvents();
        },

        bindEvents: function() {
            this.config.cart.on('click', this.loadCartItems);
        },

        loadCartItems: function(event) {
            var self = cart;

            $.ajax({
                url: '/cart/'
            }).done(function (cart) {
                $(self.config.cartBox).slideDown('fast', function() {

                    $.each(cart.items, function(index, element) {
                        console.log(index, element);
                        console.log(element.title);

                        self.config.list.append('qweqwe');
                    });
                });

            }).fail(function() {
                console.log("error - loadCart");
            });



        },
    };

    cart.init({
        list: $('ul#cart-list'),
        cart: $('#cart'),
        total: $('#total'),
        cartBox: $('#cart-box'),
    });

    admin.init({
        main: $('div#main'),
        usersLink: $('a#adminUsers'),
        categoriesLink: $('a#adminCategories'),
        productsLink: $('a#adminProducts'),
    });
});