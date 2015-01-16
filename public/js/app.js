'use strict';

$(document).ready(function() {
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var url = $(location).attr('href').split("/");
    console.log(url[url.length-1]);


    // SEARCH

    $('input.typeahead').typeahead({
        name: 'typeahead',
        remote: '/search?key=%QUERY',
        limit: 10
    }).bind('typeahead:selected', function(obj, playground) {
        window.location.href = playground.href;
    });

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
                crossDomain: false,
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type)) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });

            this.bindEvents();
        },

        bindEvents: function() {
            this.config.cart.on('click', this.loadCartItems);
            this.config.addBtn.on('click', this.addItem);
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
                            self.config.list.append('<li class="text-capitalize"><span>' + element.title + '</span><span> ' + element.qty + 'x</span><span class="pull-right price"> ' + element.price + ' kr</span></li>');
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

        addItem: function (event) {
            //TODO
        },

        removeItem: function (event) {
            //TODO
        },
    };

    cart.init({
        addBtn: $('.addBtn'),
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