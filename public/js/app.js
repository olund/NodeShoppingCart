'use strict';

$(document).ready(function() {

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

    admin.init({
        main: $('div#main'),
        usersLink: $('a#adminUsers'),
        categoriesLink: $('a#adminCategories'),
        productsLink: $('a#adminProducts'),
    });
});