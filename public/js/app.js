'use strict';

$(document).ready(function() {

    var url = $(location).attr('href').split("/");
    console.log(url[url.length-1]);

    // Lazy load images.
    /*$("img").lazyLoadImages(300, function() {
        $(this).load(function() {
            this.style.opacity = 1;
        });
    });*/

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
            $(document).on('click', this.slideUpCart);
        },

        loadCartItems: function(event) {
            event.preventDefault();
            var self = cart;

            // Reset list
            self.config.list.empty();
            self.config.total.empty();

            $.ajax({
                url: '/cart/'
            }).done(function (cart) {
                $(self.config.cartBox).slideDown(100, function() {
                    if (cart.items.length === 0) {
                        console.log('No items in cart..');
                    } else {
                        // Items in cart, loop and show it.
                        $.each(cart.items, function(index, element) {
                            self.config.list.append('<li class="text-capitalize"><span>' + element.title + '</span><span class="pull-right price"> ' + element.price + ' kr</span></li>');
                        });
                        console.log(cart);
                        self.config.total.append('Total: ' + cart.total);
                    }
                });
            }).fail(function() {
                console.log("error - loadCart");
            });
        },

        slideUpCart: function (event) {
            var self = cart;
            self.config.cartBox.slideUp(100);
        },
    };

    cart.init({
        cartspan: $('.cartspan'),
        addToCart: $('.addToCart'),
        list: $('.cart-list'),
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